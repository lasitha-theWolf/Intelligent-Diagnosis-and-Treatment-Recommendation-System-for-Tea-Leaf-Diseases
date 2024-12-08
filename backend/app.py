import os
import numpy as np
import cv2
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

MODEL_PATH = './tea_severity_model.h5'
model = load_model(MODEL_PATH)

CLASSES = ['Mild', 'Moderate', 'Severe']

def preprocess_image(image_path):
    image = load_img(image_path, target_size=(224, 224))
    image_array = img_to_array(image) / 255.0
    return np.expand_dims(image_array, axis=0), np.array(image)

def predict_severity(image_path):
    processed_image, original_image = preprocess_image(image_path)
    predictions = model.predict(processed_image)
    percentages = {CLASSES[i]: round(predictions[0][i] * 100, 2) for i in range(len(CLASSES))}
    predicted_class = CLASSES[np.argmax(predictions)]
    return predicted_class, percentages, original_image

def mark_damage(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    marked_image = image.copy()
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        cv2.rectangle(marked_image, (x, y), (x + w, y + h), (0, 255, 0), 2)
    return marked_image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    file_path = os.path.join('./uploads', file.filename)
    file.save(file_path)

    try:
        predicted_class, percentages, original_image = predict_severity(file_path)
        marked_image = mark_damage(original_image)

        output_image_path = os.path.join('./outputs', 'marked_image.png')
        cv2.imwrite(output_image_path, cv2.cvtColor(marked_image, cv2.COLOR_RGB2BGR))
        print(f"Marked image saved at: {output_image_path}")  # Debugging

        response = {
            'predicted_class': predicted_class,
            'percentages': percentages,
            'marked_image': f'http://127.0.0.1:5000/outputs/marked_image.png'  # Full URL
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        os.remove(file_path)

@app.route('/outputs/<filename>')
def serve_image(filename):
    return send_from_directory('./outputs', filename)

if __name__ == '__main__':
    os.makedirs('./uploads', exist_ok=True)
    os.makedirs('./outputs', exist_ok=True)
    app.run(debug=True)
