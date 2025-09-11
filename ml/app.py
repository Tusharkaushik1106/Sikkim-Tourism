from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

# Initialize Google Generative AI model
load_dotenv()
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-2.0-flash')

# Sikkim monastery data for context
SIKKIM_CONTEXT = """
Sikkim is home to many important Buddhist monasteries, with the most significant ones being:
1. Rumtek Monastery - The largest monastery in Sikkim, located 23 km from Gangtok
2. Pemayangtse Monastery - One of the oldest and most important monasteries in West Sikkim
3. Tashiding Monastery - A sacred monastery on top of a hill between the Rathong and Rangit rivers
4. Phodong Monastery - A beautiful monastery in North Sikkim known for its murals
5. Enchey Monastery - Located in Gangtok, built on the site blessed by Lama Druptob Karpo

These monasteries feature unique Tibetan architecture, precious artifacts, and regular Buddhist ceremonies.
Rumtek Monastery houses rare Buddhist artifacts and scriptures.
Pemayangtse contains ancient religious paintings and sculptures.
All monasteries conduct regular prayer ceremonies and important annual festivals.
"""

@app.route('/search', methods=['POST'])
def search():
    try:
        print("Received request:", flush=True)
        data = request.json
        print("Request data:", data, flush=True)
        query = data.get('query')
        if not query:
            return jsonify({'error': 'No query provided'}), 400
            
        # Add Sikkim context to the query
        enriched_query = f"Based on this information about Sikkim monasteries: {SIKKIM_CONTEXT}\n\nQuestion: {query}\nProvide a detailed answer focusing only on Sikkim monasteries. Do not mention monasteries from other regions:"
        
        response = model.generate_content(enriched_query)
        result = {
            'results': [{
                'text': str(response.text),
                'metadata': {
                    'title': 'Sikkim Monasteries',
                    'source': 'Monastery Search'
                }
            }]
        }
        print("Sending response:", result, flush=True)
        return jsonify(result)
    except Exception as e:
        print("Error:", str(e), flush=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
