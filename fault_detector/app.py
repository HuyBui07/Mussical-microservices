from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.losses import MeanSquaredError
from sklearn.preprocessing import StandardScaler
import joblib

app = Flask(__name__)

# Load your pre-trained autoencoder model
autoencoder = load_model(
    "./autoencoder_model.h5", custom_objects={'mse': MeanSquaredError()}
)

scaler = joblib.load('scaler.pkl')

RECONSTRUCTION_ERROR_THRESHOLD = 2.408904540091738

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/analyze", methods=["POST"])
def analyze_data():
    try:
        # Get the JSON data from the request
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Convert the data to a single numpy value
        input_data = np.array([data["input"]])    
  
        input_data = scaler.transform(input_data)

        # Use the autoencoder to analyze the data
        reconstructed_data = autoencoder.predict(input_data)
        reconstruction_error = np.mean(np.square(input_data - reconstructed_data))

        # Determine if the reconstruction error is within the safe range
        is_normal = reconstruction_error < RECONSTRUCTION_ERROR_THRESHOLD

        # Return the reconstruction error and normality status as the analysis result
        return jsonify({"reconstruction_error": reconstruction_error, "is_normal": bool(is_normal)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)