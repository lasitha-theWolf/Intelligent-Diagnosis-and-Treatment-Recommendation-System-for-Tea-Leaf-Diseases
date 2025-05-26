import os
import numpy as np
import cv2
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

MODEL_PATH = './tea-disease-classifier.hdf5'
model = load_model(MODEL_PATH)

# Updated classes for specific tea leaf diseases
CLASSES = ['Algal Leaf Spot', 'Grey Blight Disease', 'Brown Blight', 'Red Leaf Spot', 'White Spot']

def preprocess_image(image_path):
    image = load_img(image_path, target_size=(224, 224))
    image_array = img_to_array(image) / 255.0
    return np.expand_dims(image_array, axis=0), np.array(image)

def predict_disease(image_path):
    processed_image, original_image = preprocess_image(image_path)
    predictions = model.predict(processed_image)
    predicted_class = CLASSES[np.argmax(predictions)]
    accuracy = round(np.max(predictions) * 100, 2)
    return predicted_class, accuracy, original_image

def mark_damage(image):
    # Convert to HSV for better color detection
    hsv = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)
    
    # Define color ranges for different types of damage
    # Brown spots (Brown Blight)
    brown_lower = np.array([10, 50, 20])
    brown_upper = np.array([20, 255, 200])
    brown_mask = cv2.inRange(hsv, brown_lower, brown_upper)
    
    # Yellow/white spots (White Spot, Algal Leaf Spot)
    yellow_lower = np.array([20, 50, 50])
    yellow_upper = np.array([30, 255, 255])
    yellow_mask = cv2.inRange(hsv, yellow_lower, yellow_upper)
    
    # Dark spots (Grey Blight)
    dark_lower = np.array([0, 0, 0])
    dark_upper = np.array([180, 255, 50])
    dark_mask = cv2.inRange(hsv, dark_lower, dark_upper)
    
    # Red spots (Red Leaf Spot)
    red_lower = np.array([0, 50, 50])
    red_upper = np.array([10, 255, 255])
    red_mask = cv2.inRange(hsv, red_lower, red_upper)
    
    # Combine all masks
    combined_mask = cv2.bitwise_or(brown_mask, yellow_mask)
    combined_mask = cv2.bitwise_or(combined_mask, dark_mask)
    combined_mask = cv2.bitwise_or(combined_mask, red_mask)
    
    # Find contours and mark them
    contours, _ = cv2.findContours(combined_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    marked_image = image.copy()
    
    for contour in contours:
        area = cv2.contourArea(contour)
        if area > 100:  # Filter small noise
            x, y, w, h = cv2.boundingRect(contour)
            cv2.rectangle(marked_image, (x, y), (x + w, y + h), (0, 255, 0), 2)
            # Add disease area label
            cv2.putText(marked_image, 'Disease Area', (x, y-10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
    
    return marked_image

@app.route('/segmentation/cnn-detection', methods=['POST'])
def predict():
    if 'file' not in request.files and 'image' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    # Handle both 'file' and 'image' field names
    file = request.files.get('file') or request.files.get('image')
    if not file or file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    file_path = os.path.join('./uploads', file.filename)
    file.save(file_path)

    try:
        predicted_disease, accuracy, original_image = predict_disease(file_path)
        marked_image = mark_damage(original_image)

        output_image_path = os.path.join('./outputs', 'marked_image.png')
        cv2.imwrite(output_image_path, cv2.cvtColor(marked_image, cv2.COLOR_RGB2BGR))
        print(f"Marked image saved at: {output_image_path}")  # Debugging

        response = {
            'disease': predicted_disease,
            'accuracy': accuracy,
            'marked_image': f'http://127.0.0.1:5001/outputs/marked_image.png'
        }
        return jsonify(response)
    except Exception as e:
        print(f"Error during prediction: {str(e)}")  # Debugging
        return jsonify({'error': str(e)}), 500
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

@app.route('/outputs/<filename>')
def serve_image(filename):
    return send_from_directory('./outputs', filename)

if __name__ == '__main__':
    os.makedirs('./uploads', exist_ok=True)
    os.makedirs('./outputs', exist_ok=True)
    print("Tea Disease Classifier Server Starting...")
    print(f"Detecting diseases: {', '.join(CLASSES)}")
    app.run(debug=True, host='0.0.0.0', port=5001)