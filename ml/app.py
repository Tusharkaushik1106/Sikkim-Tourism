from flask import Flask, request, jsonify
from flask_cors import CORS
import faiss
import numpy as np
import pickle
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Set your Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Define the embedding model
EMBED_MODEL = "models/text-embedding-004"

# Load FAISS index and metadata
index = faiss.read_index("monastery_index.faiss")
with open("monastery_data.pkl", "rb") as f:
    monastery_data = pickle.load(f)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q", "")
    k = int(request.args.get("k", 5))  # default: top-5

    if not query:
        return jsonify({"error": "Missing query parameter ?q="}), 400

    # Embed query using Gemini API
    try:
        result = genai.embed_content(model=EMBED_MODEL, content=query)
        print(result)
        query_emb = np.array(result["embedding"], dtype="float32").reshape(1, -1)
    except Exception as e:
        return jsonify({"error": f"Error embedding query: {str(e)}"}), 500

    # Search FAISS index
    distances, indices = index.search(query_emb, k)

    results = []
    for i, idx in enumerate(indices[0]):
        item = monastery_data[idx]
        results.append({
            "rank": i + 1,
            "name": item["name"],
            "description": item["description"],
            "distance": float(distances[0][i])
        })

    return jsonify(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
