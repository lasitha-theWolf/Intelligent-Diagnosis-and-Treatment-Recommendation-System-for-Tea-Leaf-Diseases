import os
import numpy as np
import cv2
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

MODEL_PATH = './segmentation.h5'
model = load_model(MODEL_PATH)

def preprocess_image(image_path):
    image = load_img(image_path, target_size=(224, 224))
    image_array = img_to_array(image) / 255.0
    return np.expand_dims(image_array, axis=0), image

def segment_image(image_path):
    processed_image, original_image = preprocess_image(image_path)
    segmentation_mask = model.predict(processed_image)[0]
    # Assuming the model outputs a probability map, threshold it
    mask = (segmentation_mask > 0.5).astype(np.uint8) * 255
    return mask, original_image

def apply_segmentation_mask(original_image, mask):
    # Convert original image to numpy array if it isn't already
    original_image = np.array(original_image)
    # Ensure mask is 2D
    if len(mask.shape) == 3:
        mask = mask[:, :, 0]
    # Resize mask to match original image size
    mask = cv2.resize(mask, (original_image.shape[1], original_image.shape[0]))
    # Create colored overlay
    overlay = original_image.copy()
    overlay[mask > 0] = [0, 255, 0]  # Green overlay for segmented areas
    # Blend original image with overlay
    segmented_image = cv2.addWeighted(original_image, 0.7, overlay, 0.3, 0)
    return segmented_image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    file_path = os.path.join('./uploads', file.filename)
    file.save(file_path)

    try:
        mask, original_image = segment_image(file_path)
        segmented_image = apply_segmentation_mask(original_image, mask)

        output_image_path = os.path.join('./outputs', 'segmented_image.png')
        cv2.imwrite(output_image_path, cv2.cvtColor(segmented_image, cv2.COLOR_RGB2BGR))
        print(f"Segmented image saved at: {output_image_path}")  # Debugging

        response = {
            'message': 'Image segmented successfully',
            'segmented_image': f'http://127.0.0.1:5000/outputs/segmented_image.png'
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