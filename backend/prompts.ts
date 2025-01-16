export const SYSTEM = `
You are a professional with a deep theoretical and practical understanding of 
Agile methodologies and frameworks, with a particular emphasis on Scrum. 
Your experience allows you to design, implement, and optimize Agile processes in 
diverse contexts, adapting them to the specific needs of each organization.
`;

export const PROMPT_ACCEPTANCE_CRITERIA = (userStory: string, description?: string) => `
Acceptance criteria for a user story are essential to ensure that the development team fully understands the requirements and delivers a product that meets user needs. To be effective, they must meet the following characteristics:
Clarity and Accuracy:

Concise and direct language: Avoid ambiguity and use terms that all stakeholders understand.
Focus on observable behavior: Describe what the system should do, not how it should do it.

Concrete examples: Provide specific examples of how the user will interact with the functionality.

Completeness:

Cover all relevant scenarios: Include normal use cases, edge cases, and error conditions.

Consider different perspectives: Take into account the needs of all users involved.

Verifiability:
Define measurable and verifiable conditions: Establish criteria that can be objectively tested.
Use acceptance tests: Define specific tests that demonstrate that the user story meets the criteria.

Relevance:
Align the criteria with business value: Ensure that the criteria contribute to the project objectives.
Prioritize the most important criteria: Identify the criteria that are essential for user satisfaction.

Format:
Use a consistent format: This can be a list, a table, or any other format that facilitates reading and understanding.
Keep the criteria up to date: Review and update the criteria as the project progresses.

Remember that acceptance criteria are a communication tool between the development team and the user. They should be clear, concise, and easy for everyone involved to understand.

Example 1: E-commerce website
INPUT
User Story: As a customer, I want to be able to filter products by price range so that I can easily find products within my budget.

OUTPUT
Acceptance Criteria:
- The user can specify a minimum and maximum price.
- The results page displays only products within the specified price range.
- The price filter can be combined with other filters (e.g., category, brand).
- The filter should work correctly with different currencies.
- If no products match the filter, a message is displayed informing the user.

Example 2: Mobile Banking App
INPUT
User Story: As a bank customer, I want to be able to view my account balance on the app's home screen so that I can quickly check my finances.
Description: I want to be able to view my account balance on the app's home screen so that I can quickly check my finances.

OUTPUT
Acceptance Criteria:
- The account balance is displayed prominently on the home screen after logging in.
- The balance is updated in real-time.
- The balance can be displayed in different currencies.
- The user can choose to hide the balance for privacy.
- If there is an error retrieving the balance, an error message is displayed.

Example 3: Project Management Tool
INPUT
User Story: As a project manager, I want to be able to assign tasks to team members so that I can track progress and ensure everyone knows their responsibilities.
Description: I want to be able to assign tasks to team members so that I can track progress and ensure everyone knows their responsibilities.

OUTPUT
Acceptance Criteria:

- The project manager can select a task and assign it to one or more team members.
- The assigned team member is notified of the new task.
- The task is displayed in the assignee's task list.
- The project manager can reassign tasks.
- The system prevents assigning a task to someone who is already over capacity.

Example 4: Social Media Platform
INPUT
User Story: As a user, I want to be able to block other users so that I can control who can interact with me.
Description: I want to be able to block other users so that I can control who can interact with me.

OUTPUT
Acceptance Criteria:
- The user can block another user from their profile page.
- Blocked users cannot view the user's profile or posts.
- Blocked users cannot send messages or friend requests to the user.
- The user can unblock another user.
- The system confirms with the user before blocking someone.


INPUT
User Story: ${userStory}
Description: ${description}
OUTPUT:
`;

export const PROMPT_TEST_CASES = (
  userStory: string,
  acceptanceCriterias: string[],
  description?: string
) => `

Test cases are derived from acceptance criteria to provide a detailed and structured approach to testing user stories. They outline the specific steps, inputs, and expected outcomes that will be used to verify that the software meets the defined acceptance criteria. Essentially, test cases translate the "what" of the acceptance criteria into the "how" of testing.
Good Practices for Defining Test Cases from Acceptance Criteria:
One-to-One Mapping: Each acceptance criterion should ideally have at least one corresponding test case. This ensures that all aspects of the user story are thoroughly tested.
Clear and Concise Steps: Test cases should outline the steps to be taken in a clear, concise, and unambiguous manner. Use action verbs and avoid technical jargon.
Specific Inputs and Expected Outputs: Clearly define the inputs (data, user actions) for each step and the expected outputs (system responses, data changes).
Cover Different Scenarios: Include test cases for normal use cases, edge cases, and error conditions. Consider different user roles and permissions.
Positive and Negative Testing: Include both positive test cases (to verify that the system works as expected) and negative test cases (to verify that the system handles invalid inputs and error conditions gracefully).
Traceability: Maintain a clear link between test cases and the corresponding acceptance criteria. This helps in tracking test coverage and identifying any gaps.
Testability: Ensure that the test cases are testable, meaning that they can be executed and the results can be objectively evaluated.
Maintainability: Write test cases that are easy to understand, modify, and reuse. Use a consistent format and structure.
Prioritization: Prioritize test cases based on the risk and importance of the corresponding acceptance criteria.
Collaboration: Involve the development team, testers, and the Product Owner in the process of defining test cases to ensure shared understanding and comprehensive coverage.

By following these good practices, you can create effective test cases that help ensure the quality and functionality of the software, and ultimately, user satisfaction.

Format for the output:
- TestId
- Description
- Steps
- Input
- Expected Output

Example: E-commerce Shopping Cart
INPUT:
User Story: As a customer, I want to be able to add items to my shopping cart so that I can purchase them later.
Description: I want to be able to add items to my shopping cart so that I can purchase them later.
Acceptance Criteria:
The user can add items to the cart from the product details page.
The cart displays the correct quantity of each item added.
The cart displays the total price of all items in the cart.
The user can remove items from the cart.
The cart persists even if the user leaves the website and returns later.

OUTPUT:
Test Cases:

TC_001:
Description: Add item to cart
Steps:
 - Go to the product details page.
 - Click the "Add to Cart" button.
Input: Product on the product details page
Expected Output: Item is added to the cart. Cart displays the correct quantity and total price.

TC_002:
Description: Add multiple items to cart
Steps:
 - Go to the product details page for product A.
 - Click the "Add to Cart" button twice.
 - Go to the product details page for product B.
 - Click the "Add to Cart" button.
Input: Product A and Product B
Expected Output: Both items are added to the cart. Cart displays quantity 2 for product A and quantity 1 for product B, with the correct total price.

TC_003:
Description: Remove item from cart
Steps:
 - Go to the cart page.
 - Click the "Remove" button next to an item.
Input: Item in the cart
Expected Output: Item is removed from the cart. Cart displays the updated quantity and total price.

TC_004:
Description: Empty cart
Steps:
 - Go to the cart page.
 - Click the "Remove" button for all items in the cart.
Input: Items in the cart
Expected Output: All items are removed from the cart. Cart displays a message indicating it is empty.

TC_005:
Description: Cart persistence
Steps:
 - Add an item to the cart.
 - Close the browser.
 - Reopen the browser and go to the website.
 - Go to the cart page.
Input: Item added to the cart
Expected Output: The cart still contains the previously added item with the correct quantity and price.

INPUT:
User Story: ${userStory}
Description: ${description}
Acceptance Criteria:
${acceptanceCriterias.forEach((criteria) => `- ${criteria}\n`)}
OUTPUT:
`;
