# DetectiSign: AI-Powered Signature Verification System

![DetectiSign Banner](https://img.shields.io/badge/AI-Signature_Verification-22c55e?style=for-the-badge&logo=shield)
![Status](https://img.shields.io/badge/Status-Production_Ready-6366f1?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-amber-400?style=for-the-badge)

**DetectiSign** is an enterprise-grade biometric AI application designed to analyze, detect, and verify handwritten signature authenticity. It uses Computer Vision algorithms including Otsu Adaptive Binarization, Structural Similarity Index (SSIM), Stroke Density Mapping, Centroid Alignment, and Difference Heatmaps to spot even skilled signature forgeries.

---

## 🌟 Key Demo Features

1. **Dual Operational Modes**:
   - **Image Upload Mode**: Upload PNG, JPG, JPEG, or WEBP reference & questioned signature files with instant drag-and-drop & crop preview.
   - **Live Digital Pad Mode**: Draw signatures in real-time directly on canvas with touch, mouse, or stylus support.

2. **Computer Vision & Morphological AI Pipeline**:
   - **Otsu Thresholding & Background Removal**: Removes paper texture, shadows, and scanner noise.
   - **Tight Bounding Box Normalization**: Aligns signature center of mass and normalizes scale to a $300 \times 150$ spatial grid.
   - **Structural Similarity Index (SSIM)**: Compares luminance, contrast, and structural stroke patterns.
   - **Stroke Density & Baseline Skew Analysis**: Evaluates pen pressure variations and angle inclination.

3. **Interactive Visual Heatmap & Metric Breakdown**:
   - **Emerald Green Strokes**: Region of genuine matching strokes.
   - **Bright Red/Coral Overlay**: Region of stroke deviation or forgery attempt.
   - **5-Dimension Radar Matrix**: Breaks down match percentages for SSIM, Aspect Ratio, Density, Centroid, and Contour Overlap.

4. **1-Click Preset Demo Dataset**:
   - Built-in test cases (**Genuine Pair**, **Skilled Forgery**, **Random Forgery**) for smooth demo presentations without external file dependencies.

5. **Instant Audit Report Generation**:
   - Export official PDF audit reports with ID, timestamp, visual evidence diffs, and verification metrics.

---

## 🚀 How to Run the Web Application

### Option A: Direct Browser Launch (100% Offline / Client-Side)
No server installation required!
1. Open the file `index.html` directly in any web browser (Chrome, Edge, Firefox, Safari).
2. Click **"Load Sample Demo"** or pick a preset from the **Sample Dataset** section to demonstrate instant AI verification to your professor/ma'am.

### Option B: Local HTTP Server (Python)
To serve via HTTP localhost:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### Option C: Python Flask REST API Backend (Optional)
If your demo requires a dedicated Python API:
```bash
cd python_backend
pip install -r requirements.txt
python app.py
```
The server will run on `http://localhost:5000`.

---

## 📊 Presentation Talking Points for Demo

When presenting **DetectiSign** to your Ma'am / Examiner:

1. **Problem Statement**:
   - Manual signature verification in banking, legal, and financial transactions is error-prone, slow, and susceptible to skilled forgery.

2. **Our Solution**:
   - DetectiSign provides automated optical feature extraction combining structural image similarity (SSIM) and morphological stroke density analysis for instant classification ($>78\%$ Genuine, $<78\%$ Forged).

3. **Live Demonstration Workflow**:
   - Show **Test Case 1 (Genuine Pair)** $\rightarrow$ Point out high SSIM match ($\sim 95\%$) and green stroke overlap.
   - Show **Test Case 2 (Skilled Forgery)** $\rightarrow$ Point out red highlighted stroke deviations on the AI Difference Map.
   - Demonstrate **Live Digital Pad Mode** by drawing a signature directly on screen!
   - Click **"Download Verification Audit Report (PDF)"** to showcase enterprise readiness.

---

## 🛠️ Built With
- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6+), HTML5 Canvas API
- **Computer Vision & AI Engine**: Custom JS SSIM & Binarization Engine, Scikit-Image / OpenCV Python Backend
- **Report Generation**: html2pdf.js
- **Icons & Design**: FontAwesome 6.4, Plus Jakarta Sans Font

---

&copy; 2026 DetectiSign Team — AI-Powered Signature Verification System
