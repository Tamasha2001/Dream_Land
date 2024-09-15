from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model and label encoders
with open('land_price_model.pkl', 'rb') as file:
    model = pickle.load(file)

with open('label_encoders.pkl', 'rb') as file:
    label_encoders = pickle.load(file)

# Function to preprocess input data
def preprocess_input(input_data):
    # Apply label encoding to categorical features
    for column, encoder in label_encoders.items():
        input_data[column] = encoder.transform([input_data[column]])[0]
    
    # Convert input to DataFrame for model prediction
    input_df = pd.DataFrame([input_data])
    return input_df

@app.route('/')
def index():
    return "<h1>Welcome to the Land Price Prediction API</h1><p>Use the /predict endpoint to get predictions.</p>"

@app.route('/favicon.ico')
def favicon():
    return '', 204

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        # Preprocess the input data
        input_df = preprocess_input(data)

        # Make a prediction
        prediction = model.predict(input_df)

        # Return the prediction as JSON
        return jsonify({'predicted_price': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
