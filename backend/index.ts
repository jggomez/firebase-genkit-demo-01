import { gemini15Flash, googleAI } from "@genkit-ai/googleai";
import { genkit, z } from "genkit";
import {
  SYSTEM,
  PROMPT_ACCEPTANCE_CRITERIA,
  PROMPT_TEST_CASES,
} from "./prompts";
import { enableFirebaseTelemetry } from "@genkit-ai/firebase";

enableFirebaseTelemetry();

const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash,
});

const InputUserStories = z.object({
  userStory: z.string(),
  description: z.string(),
});

const OutputAcceptanceCriterias = z.array(z.string());

const OutputTestCases = z.array(
  z.object({
    testId: z.string(),
    description: z.string(),
    steps: z.string(),
    input: z.string(),
    expectedOutput: z.string(),
  })
);

const OutputComponentsProcess = z.object({
  acceptanceCriterias: OutputAcceptanceCriterias.nullable(),
  testCases: OutputTestCases.nullable(),
});

const generateActivitiesSoftware = ai.defineFlow(
  {
    name: "generateActivitiesSoftware",
    inputSchema: InputUserStories,
    outputSchema: OutputComponentsProcess,
  },
  async (input: z.infer<typeof InputUserStories>) => {
    const { userStory, description } = input;

    let acceptanceCriterias: string[] | null = [];
    let testCases:
      | {
          testId: string;
          description: string;
          steps: string;
          input: string;
          expectedOutput: string;
        }[]
      | null = [];

    const { output } = await ai.generate({
      system: SYSTEM,
      prompt: PROMPT_ACCEPTANCE_CRITERIA(userStory, description),
      config: {
        temperature: 0.5,
      },
      output: {
        schema: OutputAcceptanceCriterias,
      },
    });
    acceptanceCriterias = output;

    if (acceptanceCriterias) {
      const outputTesCases = await ai.generate({
        system: SYSTEM,
        prompt: PROMPT_TEST_CASES(userStory, acceptanceCriterias, description),
        config: {
          temperature: 0.5,
        },
        output: {
          schema: OutputTestCases,
        },
      });

      testCases = outputTesCases?.output;
    }

    return {
      acceptanceCriterias,
      testCases,
    };
  }
);

ai.startFlowServer({
  flows: [generateActivitiesSoftware],
  cors: {
    origin: "*",
  },
});
