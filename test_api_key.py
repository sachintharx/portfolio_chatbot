import requests



import requests
import time

api_key = "AIzaSyDVesbvbOl7dYrtGcCJy3q86vgiHrg29pc"  # Updated API key
url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + api_key
import requests
import time

api_key = "AIzaSyDVesbvbOl7dYrtGcCJy3q86vgiHrg29pc"  # Updated API key
url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=" + api_key
payload = {
    "contents": [
        {
            "parts": [
                {
                    "text": "Explain how AI works in a few words"
                }
            ]
        }
    ]
}
headers = {"Content-Type": "application/json"}

max_retries = 5
wait_seconds = 10

for attempt in range(1, max_retries + 1):
    response = requests.post(url, json=payload, headers=headers)
    result = response.json()
    if response.status_code == 200 and 'error' not in result:
        print(result)
        break
    elif response.status_code == 503:
        print(f"Attempt {attempt}: Model overloaded, retrying in {wait_seconds} seconds...")
        time.sleep(wait_seconds)
    else:
        print(f"Error: {result}")
        break