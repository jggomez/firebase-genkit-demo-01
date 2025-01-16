import gradio as gr
import requests
import json

ui_blocks = gr.Blocks()


def create_text_test_cases(test_cases):
    text_test_cases = []
    for test_case in test_cases:
        text_test_cases.append(f"{test_case['testId']}\n input: {test_case['input']}\n description:{test_case['description']}\n expectedOutput:{test_case['expectedOutput']}\n steps:{test_case['steps']}")
    return "\n\n".join(text_test_cases)

def get_generate_activities_software(user_story, detail_description):
    url = "https://process-creator-software-823002731253.us-central1.run.app/generateActivitiesSoftware"
    request_body = {
        "data": {
            "userStory": user_story,
            "description": detail_description,
        }}
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers,
                             data=json.dumps(request_body, indent=4))

    if response.status_code == 200:
        response_data = response.json()
        acceptance_criterias = response_data["result"]["acceptanceCriterias"]
        test_cases = response_data["result"]["testCases"]
        print(test_cases)
        print(acceptance_criterias)
        acceptance_criterias_text = "\n\n".join(acceptance_criterias)
        test_cases_text = create_text_test_cases(test_cases)
        return acceptance_criterias_text, test_cases_text

    print(f"Request failed with status code {response.status_code}")
    print(response.text)


with ui_blocks:
    gr.Interface(
        fn=get_generate_activities_software,
        inputs=[gr.Textbox(label="Write your User Story", lines=4),
                gr.Textbox(label="Detail Description", lines=3),],
        outputs=[gr.Textbox(label="Acceptance Criteria", lines=15),
                 gr.Textbox(label="Test Cases", lines=15)],
        allow_flagging="never")

if __name__ == "__main__":
    ui_blocks.launch(server_name="0.0.0.0", server_port=8080)
    #ui_blocks.launch()
