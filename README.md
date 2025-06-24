# Firebase Genkit Demo: Creating Acceptance Criteria and Test Cases from User Stories

This repository demonstrates how to use [Firebase Genkit](https://firebase.google.com/docs/genkit) to build an AI-powered application that generates acceptance criteria and test cases from user stories. The application is built with a Gradio UI and deployed on Cloud Run.

## Features

  * **Generating Content:**  Leverages Genkit's AI capabilities to generate acceptance criteria and test cases based on user story input.
  * **Creating Flows:** Defines a Genkit flow to orchestrate the AI model interaction and output generation.
  * **Observability and Monitoring:**  Integrates with Firebase's monitoring tools to track usage and performance.
  * **Cloud Run Deployment:** Deploys the application as a scalable web service on Cloud Run.
  * **Gradio UI:** Provides a user-friendly interface for interacting with the application.

## How it Works

1.  **User Input:** The user provides a user story and a description of a new feature or need.
2.  **Genkit Flow:** The application uses a Genkit flow to process the input. This flow likely includes steps to:
      * Analyze the user story and description.
      * Extract key information and requirements.
      * Use an AI model to generate acceptance criteria.
      * Use an AI model to generate test cases based on acceptance criterias, user story and description 
3.  **Output:** The generated acceptance criteria and test cases are displayed in the Gradio UI.

## Getting Started

1.  **Install dependencies:** `poetry install`
2.  **Set up Firebase:**
      * Create a Firebase project.
      * Enable billing for your project.
      * Set up Firebase Genkit.
      * [Firebase Genkit documentation](https://firebase.google.com/docs/genkit)
4.  **Deploy to Cloud Run:**
      * Follow the instructions in [Genkit flows as HTTPS endpoints using Cloud Run](https://firebase.google.com/docs/genkit/cloud-run) to deploy the application.
      * Deploy Backend
        * `gcloud run deploy process-creator-software --source . --update-secrets=GOOGLE_GENAI_API_KEY=GOOGLE_GENAI_API_KEY:latest --region=us-central1`
      * Deploy Frontend
        * `gcloud builds submit --region=us-central1 --tag gcr.io/PROJECT/process-creator-software-ui`
        * `gcloud run deploy process-creator-software-ui --image=gcr.io/PROJECT/process-creator-software-ui --region=us-central1 --platform managed`
5.  **Run the application:**
      * Open the Gradio UI in your browser.
      * Enter a user story and description.
      * Click the "Submit" button to see the output.

## Example Usage

**User Story:**

> As a user, I want to be able to search for products by keyword so that I can quickly find what I'm looking for.

**Description:**

> The search functionality should allow users to enter a keyword or phrase and see a list of relevant products. The search results should be sorted by relevance. Users should be able to filter the results by category, price, and other criteria.

**Generated Output:**

**Acceptance Criteria:**

  * The user can enter a keyword or phrase in a search box.
  * The system displays a list of products that match the search term.
  * The search results are sorted by relevance.
  * The user can filter the results by category, price, and other criteria.
  * The system handles spelling errors and suggests alternative search terms.
  * The system displays a message if no products match the search term.

**Test Cases:**

  * **TC_001**
  * **Input:** Keyword: "Laptop"
  * **Description:** Search for a product by keyword
  * **ExpectedOutput:** A list of relevant products is displayed, sorted by relevance.
  * **Steps:** A list of relevant products is displayed, sorted by relevance.  
    * **1.** Go to the search bar.
    * **2.** Enter the keyword "Laptop".
    * **3.** Click the search button.

  * **TC_002**
  * **Input:** Keywords: "Dell Laptop"
  * **Description:** Search for a product with multiple keywords
  * **ExpectedOutput:** A list of relevant products is displayed, sorted by relevance.
  * **Steps:** A list of relevant products is displayed, sorted by relevance.  
    * **1.** Go to the search bar.
    * **2.** Enter the keywords "Dell Laptop".
    * **3.** Click the search button.

![Screenshot 2025-01-16 at 12 54 57 p m](https://github.com/user-attachments/assets/cfc702b1-0ef1-4047-b708-8e75b88ba6ce)

![Screenshot 2025-01-16 at 1 35 46 p m](https://github.com/user-attachments/assets/6bbfd28e-332c-43b2-9499-3621fea209ae)

![Screenshot 2025-01-16 at 1 50 57 p m](https://github.com/user-attachments/assets/c67b3f2f-10e3-4b16-af45-84a4c356ab04)

![Screenshot 2025-01-16 at 1 51 08 p m](https://github.com/user-attachments/assets/1196ec37-258c-4d92-b2de-d7648727383c)

![Screenshot 2025-01-16 at 1 51 18 p m](https://github.com/user-attachments/assets/74dda9a5-2485-4b6d-9253-4d7829df93e0)


This repository is actively maintained and updated with new examples and use cases. Contributions are welcome!

Made with ❤ by  [jggomez](https://devhack.co).

[![Twitter Badge](https://img.shields.io/badge/-@jggomezt-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/jggomezt)](https://twitter.com/jggomezt)
[![Linkedin Badge](https://img.shields.io/badge/-jggomezt-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jggomezt/)](https://www.linkedin.com/in/jggomezt/)
[![Medium Badge](https://img.shields.io/badge/-@jggomezt-03a57a?style=flat-square&labelColor=000000&logo=Medium&link=https://medium.com/@jggomezt)](https://medium.com/@jggomezt)

## License

    Copyright 2025 Juan Guillermo Gómez

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
