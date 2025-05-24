import os
import numpy as np
import cv2
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load all models
CLASSIFICATION_MODEL_PATH = './classification.h5'
TEA_CLASSIFIER_MODEL_PATH = './tea-disease-classifier.hdf5'
SEGMENTATION_MODEL_PATH = './segmentation.h5'

classification_model = load_model(CLASSIFICATION_MODEL_PATH)
tea_classifier_model = load_model(TEA_CLASSIFIER_MODEL_PATH)
segmentation_model = load_model(SEGMENTATION_MODEL_PATH)

CLASSES = ['Mild', 'Moderate', 'Severe']

def preprocess_image(image_path, target_size=(224, 224)):
    image = load_img(image_path, target_size=target_size)
    image_array = img_to_array(image) / 255.0
    return np.expand_dims(image_array, axis=0), np.array(image)

# Classification model 1 (classification.h5)
def predict_classification(image_path):
    processed_image, original_image = preprocess_image(image_path)
    predictions = classification_model.predict(processed_image)
    percentages = {CLASSES[i]: round(predictions[0][i] * 100, 2) for i in range(len(CLASSES))}
    predicted_class = CLASSES[np.argmax(predictions)]
    return predicted_class, percentages, original_image

# Classification model 2 (tea-disease-classifier.hdf5)
def predict_tea_classification(image_path):
    processed_image, _ = preprocess_image(image_path)
    predictions = tea_classifier_model.predict(processed_image)
    percentages = {CLASSES[i]: round(predictions[0][i] * 100, 2) for i in range(len(CLASSES))}
    predicted_class = CLASSES[np.argmax(predictions)]
    return predicted_class, percentages

# Segmentation model (segmentation.h5)
def segment_image(image_path):
    processed_image, original_image = preprocess_image(image_path)
    segmentation_mask = segmentation_model.predict(processed_image)[0]
    mask = (segmentation_mask > 0.5).astype(np.uint8) * 255
    return mask, original_image

def apply_segmentation_mask(original_image, mask):
    original_image = np.array(original_image)
    if len(mask.shape) == 3:
        mask = mask[:, :, 0]
    mask = cv2.resize(mask, (original_image.shape[1], original_image.shape[0]))
    overlay = original_image.copy()
    overlay[mask > 0] = [0, 255, 0]  # Green overlay
    segmented_image = cv2.addWeighted(original_image, 0.7, overlay, 0.3, 0)
    return segmented_image

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
        # Pipeline Step 1: First classification model
        class1_pred, class1_percent, original_image = predict_classification(file_path)
        marked_image = mark_damage(original_image)

        # Pipeline Step 2: Tea disease classification
        class2_pred, class2_percent = predict_tea_classification(file_path)

        # Pipeline Step 3: Segmentation
        mask, _ = segment_image(file_path)
        segmented_image = apply_segmentation_mask(original_image, mask)

        # Save outputs
        marked_path = os.path.join('./outputs', 'marked_image.png')
        segmented_path = os.path.join('./outputs', 'segmented_image.png')
        
        cv2.imwrite(marked_path, cv2.cvtColor(marked_image, cv2.COLOR_RGB2BGR))
        cv2.imwrite(segmented_path, cv2.cvtColor(segmented_image, cv2.COLOR_RGB2BGR))

        # Prepare response
        response = {
            'classification_1': {
                'predicted_class': class1_pred,
                'percentages': class1_percent,
                'marked_image': f'http://127.0.0.1:5000/outputs/marked_image.png'
            },
            'tea_classification': {
                'predicted_class': class2_pred,
                'percentages': class2_percent
            },
            'segmentation': {
                'segmented_image': f'http://127.0.0.1:5000/outputs/segmented_image.png'
            }
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