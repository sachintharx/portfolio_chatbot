from google import genai

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client()

# Fetch the list of available models
try:
    models = client.models.list()
    print("Available models:")
    for model in models:
        print(f"- {model.name}: {model.description}")
except Exception as e:
    print("Error fetching models:", e)