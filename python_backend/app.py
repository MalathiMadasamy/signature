"""
DetectiSign: AI-Powered Signature Verification Flask Backend API
Serves Python OpenCV & Scikit-Image (SSIM) Verification Endpoint
"""

import os
import base64
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
from skimage.metrics import structural_similarity as ssim

app = Flask(__name__)
CORS(app)

def base64_to_cv2_image(base64_str):
    """Convert base64 string to OpenCV BGR image matrix"""
    if ',' in base64_str:
        base64_str = base64_str.split(',')[1]
    image_bytes = base64.b64decode(base64_str)
    nparr = np.frombuffer(image_bytes, np.uint8)
    return cv2.imdecode(nparr, cv2.IMREAD_COLOR)

def preprocess_signature(img, target_size=(300, 150)):
    """Preprocess image: Grayscale, Otsu thresholding, bounding crop, resize"""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Otsu thresholding
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    
    # Bounding box crop
    coords = cv2.findNonZero(thresh)
    if coords is not None:
        x, y, w, h = cv2.boundingRect(coords)
        cropped = thresh[y:y+h, x:x+w]
    else:
        cropped = thresh
        
    resized = cv2.resize(cropped, target_size, interpolation=cv2.INTER_AREA)
    return resized

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "online", "model": "DetectiSign AI OpenCV/SSIM v2.4"})

@app.route('/api/verify', methods=['POST'])
def verify_signatures():
    try:
        data = request.get_json()
        ref_b64 = data.get('reference_signature')
        test_b64 = data.get('questioned_signature')

        if not ref_b64 or not test_b64:
            return jsonify({"error": "Both reference_signature and questioned_signature base64 strings are required"}), 400

        # Decode & Preprocess
        ref_img = base64_to_cv2_image(ref_b64)
        test_img = base64_to_cv2_image(test_b64)

        ref_proc = preprocess_signature(ref_img)
        test_proc = preprocess_signature(test_img)

        # Calculate Structural Similarity Index (SSIM)
        score, diff = ssim(ref_proc, test_proc, full=True)
        ssim_percentage = float(score * 100)

        # Feature comparisons
        ref_density = np.count_nonzero(ref_proc) / (300 * 150)
        test_density = np.count_nonzero(test_proc) / (300 * 150)
        density_diff = abs(ref_density - test_density)
        density_score = max(0, 100 - (density_diff * 400))

        overall_score = round((ssim_percentage * 0.7) + (density_score * 0.3), 1)
        is_genuine = overall_score >= 75.0

        return jsonify({
            "status": "success",
            "overall_similarity": overall_score,
            "is_genuine": is_genuine,
            "classification": "GENUINE" if is_genuine else "FORGERY",
            "metrics": {
                "ssim": round(ssim_percentage, 1),
                "density_similarity": round(density_score, 1)
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
