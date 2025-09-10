import os
import pandas as pd
import numpy as np
import faiss
import pickle
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Set your Gemini API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Define the embedding model
EMBED_MODEL = "models/text-embedding-004"

# Load monastery dataset
df = pd.read_csv("monasteries.csv")

# Generate embeddings for each description
print("👉 Generating embeddings for monasteries...")
embeddings = []
for desc in df["description"]:
    try:
        result = genai.embed_content(model=EMBED_MODEL, content=desc)
        emb = result["embedding"]  # Access embeddings from the dictionary
        embeddings.append(emb)
    except Exception as e:
        print("❌ Error generating embedding for:", desc)
        print(e)
        raise

# Convert embeddings to a NumPy array
embeddings = np.array(embeddings).astype("float32")

# Build FAISS index
dim = embeddings.shape[1]
index = faiss.IndexFlatL2(dim)
index.add(embeddings)

# Save index and metadata
faiss.write_index(index, "monastery_index.faiss")
with open("monastery_data.pkl", "wb") as f:
    pickle.dump(df.to_dict(orient="records"), f)

print("✅ Index built! Saved as monastery_index.faiss + monastery_data.pkl")
