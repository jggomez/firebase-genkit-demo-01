import { googleAI } from "@genkit-ai/googleai";
import { genkit, z } from "genkit";
import { startFlowServer } from "@genkit-ai/express";
import { enableFirebaseTelemetry } from "@genkit-ai/firebase";

enableFirebaseTelemetry();

const ai = genkit({
  plugins: [googleAI()],
});

const InputUserStories = z.object({
  userStory: z.string(),
  description: z.string(),
  language: z.string(),
});

const OutputAcceptanceCriterias = z.array(z.string());

const OutputTestCases = z.array(
  z.object({
    testId: z.string(),
    description: z.string(),
    input: z.string(),
    expectedOutput: z.string(),
    steps: z.array(
      z.object({
        description: z.string(),
      })
    ),
  })
);

const OutputTestCasesAgentTesting = z.array(
  z.object({
    goal: z.string(),
    hint: z.string(),
    successCriteria: z.string(),
  })
);

const OutputComponentsProcess = z.object({
  acceptanceCriterias: OutputAcceptanceCriterias.nullable(),
  testCases: OutputTestCases.nullable(),
  testCasesAgentTesting: OutputTestCasesAgentTesting.nullable(),
});

async function generateTestCases(
  userStory: string,
  description: string,
  acceptanceCriterias: string[],
  language: string
) {
  const testCasesPrompt = await ai.prompt("test_cases");

  const outputTesCases = await testCasesPrompt(
    {
      userStory,
      description,
      acceptanceCriterias,
      language,
    },
    {
      output: {
        schema: OutputTestCases,
      },
    }
  );

  return outputTesCases?.output;
}

async function generateTestCasesAgentTesting(
  userStory: string,
  description: string,
  acceptanceCriterias: string[]
) {
  const testCasesAgentTestingPrompt = await ai.prompt("test_cases_firebase");

  const outputTesCasesAgentTesting = await testCasesAgentTestingPrompt(
    {
      userStory,
      description,
      acceptanceCriterias,
    },
    {
      output: {
        schema: OutputTestCasesAgentTesting,
      },
    }
  );

  return outputTesCasesAgentTesting?.output;
}

const generateActivitiesSoftware = ai.defineFlow(
  {
    name: "generateActivitiesSoftware",
    inputSchema: InputUserStories,
    outputSchema: OutputComponentsProcess,
  },
  async (input: z.infer<typeof InputUserStories>) => {
    const { userStory, description, language } = input;

    let acceptanceCriterias: string[] | null = [];
    let testCases:
      | {
          testId: string;
          description: string;
          steps: Array<{ description: string }>;
          input: string;
          expectedOutput: string;
        }[]
      | null = [];

    let testCasesAgentTesting:
      | {
          goal: string;
          hint: string;
          successCriteria: string;
        }[]
      | null = [];

    const acceptanceCriteriaPrompt = await ai.prompt("acceptance_criteria");

    const { output } = await acceptanceCriteriaPrompt(
      {
        userStory,
        description,
        language,
      },
      {
        output: {
          schema: OutputAcceptanceCriterias,
        },
      }
    );
    acceptanceCriterias = output;

    if (acceptanceCriterias) {
      const [generatedTestCases, generatedTestCasesAgentTesting] =
        await Promise.all([
          generateTestCases(
            userStory,
            description,
            acceptanceCriterias,
            language
          ),
          generateTestCasesAgentTesting(
            userStory,
            description,
            acceptanceCriterias
          ),
        ]);

      testCases = generatedTestCases;
      testCasesAgentTesting = generatedTestCasesAgentTesting;
    }

    return {
      acceptanceCriterias,
      testCases,
      testCasesAgentTesting,
    };
  }
);

startFlowServer({
  flows: [generateActivitiesSoftware],
  cors: {
    origin: "*",
  },
});
