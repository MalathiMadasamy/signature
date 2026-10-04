/**
 * DetectiSign Main Application Controller
 */

class Application {
    constructor() {
        this.currentMode = 'upload'; // 'upload' or 'draw'
        this.refData = null;  // Image URL or Canvas element
        this.testData = null; // Image URL or Canvas element

        this.refCanvas = null;
        this.testCanvas = null;

        this.init();
    }

    init() {
        // Initialize canvases once DOM loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.refCanvas = new SignatureCanvas('ref-canvas');
            this.testCanvas = new SignatureCanvas('test-canvas');
            this.setupDragAndDrop('ref');
            this.setupDragAndDrop('test');
        });
    }

    setMode(mode) {
        this.currentMode = mode;

        // Toggle Active Tab Style
        document.getElementById('tab-upload-btn').classList.toggle('active', mode === 'upload');
        document.getElementById('tab-draw-btn').classList.toggle('active', mode === 'draw');

        // Toggle Containers
        const refUpload = document.getElementById('ref-upload-container');
        const refDraw = document.getElementById('ref-draw-container');
        const testUpload = document.getElementById('test-upload-container');
        const testDraw = document.getElementById('test-draw-container');

        if (mode === 'upload') {
            refUpload.classList.remove('hidden');
            refDraw.classList.add('hidden');
            testUpload.classList.remove('hidden');
            testDraw.classList.add('hidden');
        } else {
            refUpload.classList.add('hidden');
            refDraw.classList.remove('hidden');
            testUpload.classList.add('hidden');
            testDraw.classList.remove('hidden');
            
            // Re-init canvas sizing for drawn mode
            setTimeout(() => {
                if (this.refCanvas) this.refCanvas.initCanvas();
                if (this.testCanvas) this.testCanvas.initCanvas();
            }, 100);
        }
    }

    setupDragAndDrop(type) {
        const dropzone = document.getElementById(`${type}-dropzone`);
        if (!dropzone) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, () => {
                dropzone.classList.add('border-brand-500');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, () => {
                dropzone.classList.remove('border-brand-500');
            }, false);
        });

        dropzone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files && files.length > 0) {
                this.processFile(files[0], type);
            }
        });
    }

    handleFileSelect(event, type) {
        const file = event.target.files[0];
        if (file) {
            this.processFile(file, type);
        }
    }

    processFile(file, type) {
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            this.setImagePreview(type, dataUrl, file.name, (file.size / 1024).toFixed(1) + ' KB');
        };
        reader.readAsDataURL(file);
    }

    setImagePreview(type, dataUrl, fileName, fileSize) {
        const imgElem = document.getElementById(`${type}-img`);
        const placeholder = document.getElementById(`${type}-placeholder`);
        const previewArea = document.getElementById(`${type}-preview-area`);
        const metaElem = document.getElementById(`${type}-meta`);

        imgElem.src = dataUrl;
        if (metaElem) {
            metaElem.innerHTML = `<i class="fa-solid fa-file-image"></i> ${fileName || 'Signature Sample'} <span class="text-slate-600">|</span> ${fileSize || ''}`;
        }

        placeholder.classList.add('hidden');
        previewArea.classList.remove('hidden');

        if (type === 'ref') this.refData = dataUrl;
        if (type === 'test') this.testData = dataUrl;
    }

    removeImage(type) {
        const placeholder = document.getElementById(`${type}-placeholder`);
        const previewArea = document.getElementById(`${type}-preview-area`);
        const imgElem = document.getElementById(`${type}-img`);
        const fileInput = document.getElementById(`${type}-file-input`);

        imgElem.src = '';
        if (fileInput) fileInput.value = '';

        previewArea.classList.add('hidden');
        placeholder.classList.remove('hidden');

        if (type === 'ref') this.refData = null;
        if (type === 'test') this.testData = null;
    }

    clearCanvas(type) {
        if (type === 'ref' && this.refCanvas) this.refCanvas.clear();
        if (type === 'test' && this.testCanvas) this.testCanvas.clear();
    }

    loadSample(type, sampleKey) {
        let dataUrl = '';
        let title = '';

        if (sampleKey === 'user1_gen') {
            dataUrl = SampleDataset.getUser1Genuine1();
            title = 'Sample_A_Genuine.png';
        } else if (sampleKey === 'user2_gen') {
            dataUrl = SampleDataset.getUser2Genuine();
            title = 'Sample_B_Genuine.png';
        } else if (sampleKey === 'user1_forged') {
            dataUrl = SampleDataset.getUser1Forged();
            title = 'Sample_Forged.png';
        }

        if (dataUrl) {
            this.setMode('upload');
            this.setImagePreview(type, dataUrl, title, '42.5 KB');
        }
    }

    loadPresetPair(presetType) {
        this.setMode('upload');
        if (presetType === 'genuine') {
            this.setImagePreview('ref', SampleDataset.getUser1Genuine1(), 'Genuine_Ref.png', '42 KB');
            this.setImagePreview('test', SampleDataset.getUser1Genuine2(), 'Genuine_Questioned.png', '44 KB');
        } else if (presetType === 'skilled_forgery') {
            this.setImagePreview('ref', SampleDataset.getUser1Genuine1(), 'Genuine_Ref.png', '42 KB');
            this.setImagePreview('test', SampleDataset.getUser1Forged(), 'Skilled_Forged_Target.png', '48 KB');
        } else if (presetType === 'random_forgery') {
            this.setImagePreview('ref', SampleDataset.getUser1Genuine1(), 'Genuine_Ref.png', '42 KB');
            this.setImagePreview('test', SampleDataset.getRandomForged(), 'Random_Signature.png', '39 KB');
        }

        // Auto run verification for instant demo feel!
        setTimeout(() => this.runVerification(), 300);
    }

    async runVerification() {
        let refImgElement = null;
        let testImgElement = null;

        // Resolve input elements based on active mode
        if (this.currentMode === 'upload') {
            if (!this.refData || !this.testData) {
                alert('Please upload or select both Reference and Questioned signatures to proceed.');
                return;
            }

            refImgElement = await this.loadImageAsync(this.refData);
            testImgElement = await this.loadImageAsync(this.testData);
        } else {
            // Drawn mode
            if (this.refCanvas.isEmpty() || this.testCanvas.isEmpty()) {
                alert('Please draw signatures on both digital pads before running verification.');
                return;
            }

            const refUrl = this.refCanvas.getImageDataUrl();
            const testUrl = this.testCanvas.getImageDataUrl();

            refImgElement = await this.loadImageAsync(refUrl);
            testImgElement = await this.loadImageAsync(testUrl);
        }

        // Show animated loader
        const loader = document.getElementById('loading-spinner');
        const resultsSec = document.getElementById('results-section');
        const progressBar = document.getElementById('analysis-progress');
        const statusText = document.getElementById('loading-status');
        const substatusText = document.getElementById('loading-substatus');

        loader.classList.remove('hidden');
        resultsSec.classList.add('hidden');
        progressBar.style.width = '15%';

        // Animated progress sequence for demo realism
        const steps = [
            { width: '35%', text: 'Binarizing & Removing Noise...', sub: 'Applying Otsu Adaptive Thresholding' },
            { width: '65%', text: 'Aligning Centroids & Scaling...', sub: 'Bounding box normalization to 300x150 grid' },
            { width: '85%', text: 'Computing SSIM & Morphological Contours...', sub: 'Extracting structural variance matrix' },
            { width: '100%', text: 'Generating Decision Report...', sub: 'Calculating weighted distance metrics' }
        ];

        for (const step of steps) {
            await new Promise(r => setTimeout(r, 220));
            progressBar.style.width = step.width;
            statusText.innerText = step.text;
            substatusText.innerText = step.sub;
        }

        // Execute AI Engine Analysis
        const result = await window.aiEngine.processAndVerify(refImgElement, testImgElement);

        loader.classList.add('hidden');
        this.displayResults(result);
    }

    loadImageAsync(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    displayResults(result) {
        const resultsSec = document.getElementById('results-section');
        const banner = document.getElementById('result-banner');
        const iconBg = document.getElementById('result-icon-bg');
        const icon = document.getElementById('result-icon');
        const badge = document.getElementById('result-badge');
        const title = document.getElementById('result-title');
        const desc = document.getElementById('result-description');
        const scoreText = document.getElementById('similarity-score-text');
        const rating = document.getElementById('similarity-rating');

        // Verification ID generator
        document.getElementById('verification-id').innerText = `ID: SIG-${Math.floor(10000 + Math.random() * 90000)}-${result.isGenuine ? 'AUTH' : 'FLAG'}`;

        scoreText.innerText = `${result.overallSimilarity}%`;

        if (result.isGenuine) {
            // VERIFIED GENUINE (Green theme)
            banner.className = "rounded-2xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden bg-gradient-to-r from-emerald-950/80 via-cardbg to-cardbg border-emerald-500/30";
            iconBg.className = "w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-xl shrink-0 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40";
            icon.className = "fa-solid fa-shield-check";
            badge.className = "px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
            badge.innerText = "VERIFIED GENUINE";
            title.innerText = "Signatures Match Authentically";
            desc.innerText = "High structural, geometric & stroke density similarity confirmed across all biometric parameters.";
            scoreText.className = "text-4xl font-extrabold text-emerald-400 font-mono";
            rating.className = "text-[11px] font-bold text-emerald-400 mt-1";
            rating.innerText = "Strong Match (High Confidence)";
        } else {
            // FORGERY DETECTED (Red/Rose theme)
            banner.className = "rounded-2xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden bg-gradient-to-r from-rose-950/80 via-cardbg to-cardbg border-rose-500/30";
            iconBg.className = "w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-xl shrink-0 bg-rose-500/20 text-rose-400 border border-rose-500/40";
            icon.className = "fa-solid fa-triangle-exclamation";
            badge.className = "px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30";
            badge.innerText = "FORGERY SUSPECTED";
            title.innerText = "Signature Mismatch Detected";
            desc.innerText = "Significant structural deviation, irregular stroke density, or baseline misalignment detected. Flagged for manual review.";
            scoreText.className = "text-4xl font-extrabold text-rose-400 font-mono";
            rating.className = "text-[11px] font-bold text-rose-400 mt-1";
            rating.innerText = "High Risk (Mismatch)";
        }

        // Metrics update
        this.setMetric('m1', result.metrics.ssim);
        this.setMetric('m2', result.metrics.aspect);
        this.setMetric('m3', result.metrics.density);
        this.setMetric('m4', result.metrics.centroid);
        this.setMetric('m5', result.metrics.contour);

        resultsSec.classList.remove('hidden');
        resultsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setMetric(idPrefix, value) {
        const valElem = document.getElementById(`${idPrefix}-val`);
        const barElem = document.getElementById(`${idPrefix}-bar`);
        if (valElem && barElem) {
            valElem.innerText = `${value}%`;
            barElem.style.width = `${value}%`;
            
            // Color according to value
            const num = parseFloat(value);
            if (num >= 80) {
                barElem.className = "h-full bg-emerald-500 transition-all duration-500";
                valElem.className = "font-mono text-emerald-400 font-semibold";
            } else if (num >= 65) {
                barElem.className = "h-full bg-amber-500 transition-all duration-500";
                valElem.className = "font-mono text-amber-400 font-semibold";
            } else {
                barElem.className = "h-full bg-rose-500 transition-all duration-500";
                valElem.className = "font-mono text-rose-400 font-semibold";
            }
        }
    }

    resetApp() {
        this.removeImage('ref');
        this.removeImage('test');
        this.clearCanvas('ref');
        this.clearCanvas('test');
        document.getElementById('results-section').classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    generatePDFReport() {
        const element = document.getElementById('results-section');
        if (!element) return;

        const opt = {
            margin:       0.5,
            filename:     `DetectiSign_Audit_Report_${Date.now()}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, backgroundColor: '#0b0f17' },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    }
}

window.app = new Application();
