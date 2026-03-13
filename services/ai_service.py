import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


def generate_task_details(project_name, domain, task_title):

    prompt = f"""
You are an AI assistant helping manage software development tasks.

Project Name: {project_name}
Project Domain: {domain}

Task Title: {task_title}

Generate:
1. A clear and professional task description
2. Priority level (LOW, MEDIUM, HIGH)

Return ONLY valid JSON like this:

{{
"description": "...",
"priority": "LOW | MEDIUM | HIGH"
}}
"""

    response = client.chat.completions.create(
        model="arcee-ai/trinity-large-preview:free",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    result = response.choices[0].message.content.strip()

    return json.loads(result)