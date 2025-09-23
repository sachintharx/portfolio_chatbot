import google.generativeai as genai
genai.configure(api_key="test")

for model in genai.list_models():
    print(model)