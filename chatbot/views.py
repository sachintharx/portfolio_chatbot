import os
import faiss
import numpy as np
import pickle
import tempfile
import requests
from dotenv import load_dotenv
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from huggingface_hub import InferenceClient
from langchain_community.document_loaders import TextLoader, PyPDFLoader, CSVLoader

# Load environment variables
load_dotenv()
HF_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FAISS_DB_PATH = os.path.join(BASE_DIR, "Database", "Kavinda Rajapaksha Vector DB.index")
VECTORDB_META_PATH = os.path.join(BASE_DIR, "Database", "Kavinda Rajapaksha Vector DB.pkl")
VECTOR_DIM = 384  # MiniLM embedding dimension

def load_faiss_index():
    if os.path.exists(FAISS_DB_PATH):
        return faiss.read_index(FAISS_DB_PATH)
    else:
        return faiss.IndexFlatL2(VECTOR_DIM)

def load_vector_db():
    if os.path.exists(VECTORDB_META_PATH):
        with open(VECTORDB_META_PATH, "rb") as f:
            return pickle.load(f)
    else:
        return []

def save_vector_db(vector_db):
    with open(VECTORDB_META_PATH, "wb") as f:
        pickle.dump(vector_db, f)

faiss_index = load_faiss_index()
vector_db = load_vector_db()  # [(text, embedding)]

client = InferenceClient(model=EMBEDDING_MODEL, token=HF_API_KEY)

def embed_text(text):
    emb = client.feature_extraction(text)
    return np.array(emb, dtype="float32")

def extract_text(file):
    ext = file.name.split('.')[-1].lower()
    if ext == "txt":
        return file.read().decode(errors="ignore")
    elif ext == "pdf":
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.read())
            temp_file.flush()
            loader = PyPDFLoader(temp_file.name)
            docs = loader.load()
            return " ".join([doc.page_content for doc in docs])
    elif ext == "csv":
        with tempfile.NamedTemporaryFile(delete=False, suffix=".csv") as temp_file:
            temp_file.write(file.read())
            temp_file.flush()
            loader = CSVLoader(temp_file.name)
            docs = loader.load()
            return " ".join([doc.page_content for doc in docs])
    else:
        return file.read().decode(errors="ignore")

def save_to_vector_db(text, embedding):
    faiss_index.add(np.array([embedding]))
    vector_db.append((text, embedding))
    faiss.write_index(faiss_index, FAISS_DB_PATH)
    save_vector_db(vector_db)

def is_greeting(query):
    greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"]
    return any(query.strip().lower().startswith(greet) for greet in greetings)

def is_list_query(query):
    keywords = [
        "list", "projects", "major project", "portfolio", "works", "freelance", "show projects", "my projects"
    ]
    return any(k in query.lower() for k in keywords)

def search_vector_db(query, k=15):
    """
    Retrieve more chunks to maximize project retrieval.
    Use semantic similarity and context.
    """
    query_emb = embed_text(query)
    D, I = faiss_index.search(np.array([query_emb]), k)
    results = []
    for idx in I[0]:
        if idx != -1 and idx < len(vector_db):
            results.append(vector_db[idx][0])
    # For list queries, filter to chunks that look like project entries (contain "project" or "- ")
    if is_list_query(query):
        filtered = []
        for r in results:
            if (
                "project" in r.lower()
                or "- " in r
                or "AI" in r
                or "ETL" in r
                or "data" in r.lower()
                or "web" in r.lower()
                or "application" in r.lower()
            ):
                filtered.append(r)
        # If filter is not empty, use it
        if filtered:
            results = filtered
    return results

def build_rag_prompt(query, context_chunks):
    context = "\n---\n".join(context_chunks)
    contact_keywords = ["contact", "phone", "number", "email", "whatsapp"]
    link_keywords = ["linkedin", "github", "portfolio", "website", "twitter", "facebook", "instagram", "tiktok", "link"]
    project_keywords = ["list", "projects", "major project", "portfolio", "works", "freelance", "show projects", "my projects"]

    lower_query = query.lower()

    if any(k in lower_query for k in project_keywords):
        prompt = (
            "Given the context below, answer the user's question only using information from the context. "
            "If the question asks for projects or lists, answer with a markdown bullet list of ALL relevant projects, with NAMES and brief DESCRIPTIONS if available. "
            "Do NOT invent details, only use what is present in context. "
            "If several projects appear in context, include ALL of them in the bullet list. "
            "If not present, say 'No answer found in context.' Thank you for your question!\n\n"
            f"Context:\n{context}\n\n"
            f"Question: {query}\n"
            "Answer:"
        )
    elif any(k in lower_query for k in contact_keywords):
        prompt = (
            "Given the context below, answer the user's question only using information from the context. "
            "If the user asks for contact information (phone, email, WhatsApp), reply in a friendly way, e.g. 'Yes, these are my contact numbers:' and list all numbers and emails found in context. "
            "Do NOT invent details, only use what is present in context. "
            "If not present, say 'I don't have information about that. Please contact my owner on WhatsApp: +94 779160381. Thank you for your question!'\n\n"
            f"Context:\n{context}\n\n"
            f"Question: {query}\n"
            "Answer:"
        )
    elif any(k in lower_query for k in link_keywords):
        prompt = (
            "Given the context below, answer the user's question only using information from the context. "
            "If the user asks for social links (LinkedIn, GitHub, portfolio, website, Twitter, etc.), reply in a friendly way, e.g. 'Yes, these are my links:' and list all links found in context. "
            "Do NOT invent details, only use what is present in context. "
            "If not present, say 'I don't have information about that. Please contact my owner on WhatsApp: +94 779160381. Thank you for your question!'\n\n"
            f"Context:\n{context}\n\n"
            f"Question: {query}\n"
            "Answer:"
        )
    else:
        prompt = (
            "Given the context below, answer the user's question only using information from the context. "
            "Reply in a natural and conversational way, using the context. If several possible answers appear, give all of them. "
            "Do NOT invent details, only use what is present in context. "
            "If not present, say 'I don't have information about that. Please contact my owner on WhatsApp: +94 779160381. Thank you for your question!'\n\n"
            f"Context:\n{context}\n\n"
            f"Question: {query}\n"
            "Answer:"
        )
    return prompt

def postprocess_answer(query, answer):
    if is_greeting(query):
        return (
            "Hello! I am Kavinda's AI assistant. "
            "Ask me anything about Kavinda's skills, projects, or contact info."
        )
    # If answer is a markdown list, keep as is.
    if is_list_query(query) and ("- " in answer or "* " in answer):
        return answer
    if (
        "no answer found" in answer.lower()
        or "sorry, i couldn't" in answer.lower()
        or "no query provided" in answer.lower()
        or "i don't have information" in answer.lower()
        or "no match found" in answer.lower()
    ):
        return (
            "I don't have information about that. Please contact my owner on WhatsApp: +94 779160381. Thank you for your question!"
        )
    return answer

def get_openrouter_response(prompt, model="openai/gpt-3.5-turbo"):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}]
    }
    try:
        resp = requests.post(url, headers=headers, json=data, timeout=60)
        resp.raise_for_status()
        result = resp.json()
        return result["choices"][0]["message"]["content"]
    except Exception as e:
        msg = str(e)
        if "402" in msg:
            return "Payment required or out of quota on OpenRouter. Please top up at https://openrouter.ai/ or use a free model."
        if "429" in msg:
            return "Rate limit exceeded on OpenRouter. Please wait or upgrade your API plan."
        return f"Error: {msg}"

@api_view(['GET'])
def chat_page(request):
    return render(request, 'chat.html')

@api_view(['POST'])
def ingest(request):
    text = request.data.get("text", None)
    file = request.FILES.get("file", None)
    if text:
        embedding = embed_text(text)
        save_to_vector_db(text, embedding)
        last_texts = [t[0][:200] for t in vector_db[-5:]]
        return Response({"msg": "Text embedded and saved", "last_texts": last_texts})
    elif file:
        extracted = extract_text(file)
        embedding = embed_text(extracted)
        save_to_vector_db(extracted, embedding)
        last_texts = [t[0][:200] for t in vector_db[-5:]]
        return Response({
            "msg": "File embedded and saved",
            "extracted": extracted[:200] + "...",
            "last_texts": last_texts
        })
    return Response({"error": "No input"}, status=400)

@api_view(['POST'])
def chat(request):
    query = request.data.get("query", "")
    results = search_vector_db(query, k=1)
    result = results[0] if results else "No match found."
    return Response({"response": result})

@api_view(['GET'])
def vector_db_inspect(request):
    texts = [text for (text, emb) in vector_db]
    return Response({
        "count": len(texts),
        "texts": [t[:200] + ("..." if len(t) > 200 else "") for t in texts],
    })

@api_view(['POST'])
def rag_api(request):
    query = request.data.get("query", "")
    if not query:
        return Response({"error": "No query provided."}, status=400)
    # Increase k to get more context for project queries
    k_context = 15 if is_list_query(query) else 5
    context_chunks = search_vector_db(query, k=k_context)
    prompt = build_rag_prompt(query, context_chunks)
    answer = get_openrouter_response(prompt, model="openai/gpt-3.5-turbo")
    answer = postprocess_answer(query, answer)
    return Response({
        "query": query,
        "context": "\n---\n".join(context_chunks),
        "answer": answer
    })