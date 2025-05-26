import os
import numpy as np
import cv2
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

MODEL_PATH = './classification.h5'
model = load_model(MODEL_PATH)

# Updated classes for leaf identification
LEAF_TYPES = ['Tea Leaf']
TEA_HEALTH = ['Healthy', 'Diseased']

def preprocess_image(image_path):
    image = load_img(image_path, target_size=(224, 224))
    image_array = img_to_array(image) / 255.0
    return np.expand_dims(image_array, axis=0), np.array(image)

def identify_tea_leaf_health(image_path):
    processed_image, original_image = preprocess_image(image_path)
    
    # Get predictions from the model
    predictions = model.predict(processed_image)
    
    # Analyze tea leaf health status
    health_status = analyze_tea_leaf_health(original_image)
    
    result = f"Tea Leaf - {health_status}"
    
    return result

def analyze_tea_leaf_health(image):
    """Analyze tea leaf health status"""
    
    # Convert image to HSV for better color analysis
    hsv = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)
    
    # Check for disease indicators
    # Look for brown, yellow, or dark spots indicating disease
    brown_pixels = np.sum((hsv[:, :, 0] >= 10) & (hsv[:, :, 0] <= 20) & (hsv[:, :, 1] > 50))
    yellow_pixels = np.sum((hsv[:, :, 0] >= 20) & (hsv[:, :, 0] <= 30) & (hsv[:, :, 1] > 50))
    dark_pixels = np.sum(hsv[:, :, 2] < 50)
    
    total_pixels = image.shape[0] * image.shape[1]
    disease_ratio = (brown_pixels + yellow_pixels + dark_pixels) / total_pixels
    
    if disease_ratio > 0.1:  # More than 10% diseased pixels
        health_status = "Diseased"
    else:
        health_status = "Healthy"
    
    return health_status

@app.route('/segmentation/leaf-recognition', methods=['POST'])
def classify():
    if 'file' not in request.files and 'image' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    # Handle both 'file' and 'image' field names
    file = request.files.get('file') or request.files.get('image')
    if not file or file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    file_path = os.path.join('./uploads', file.filename)
    file.save(file_path)

    try:
        result = identify_tea_leaf_health(file_path)
        
        response = {
            'result': result
        }
        return jsonify(response)
    except Exception as e:
        print(f"Error during classification: {str(e)}")  # Debugging
        return jsonify({'error': str(e)}), 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'Tea Leaf Recognition'})

if __name__ == '__main__':
    os.makedirs('./uploads', exist_ok=True)
    os.makedirs('./outputs', exist_ok=True)
    print("Tea Leaf Recognition Server Starting...")
    print("Identifying: Tea Leaf (Healthy/Diseased)")
    app.run(debug=True, host='0.0.0.0', port=5001)