/**
 * DetectiSign Interactive Canvas Manager
 * Handles responsive high-DPI canvas drawing, touch support, and stroke rendering
 */

class SignatureCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.hasStrokes = false;

        this.initCanvas();
        this.bindEvents();
    }

    initCanvas() {
        // Set up high DPI canvas resolution
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        // Maintain 500x200 canvas logical dimension
        this.canvas.width = (rect.width || 500) * dpr;
        this.canvas.height = (rect.height || 200) * dpr;
        
        this.ctx.scale(dpr, dpr);
        this.resetCanvasState();
    }

    resetCanvasState() {
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.fillStyle = '#020617'; // dark background
        this.ctx.fillRect(0, 0, rect.width, rect.height);
        
        // Drawing pen style
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 3.5;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.hasStrokes = false;
    }

    bindEvents() {
        // Mouse Events
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseleave', () => this.stopDrawing());

        // Touch Events for Mobile / Tablet / Stylus
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.startDrawing(touch);
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.draw(touch);
        }, { passive: false });

        this.canvas.addEventListener('touchend', () => this.stopDrawing());
    }

    getPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    startDrawing(e) {
        this.isDrawing = true;
        const pos = this.getPos(e);
        this.lastX = pos.x;
        this.lastY = pos.y;
    }

    draw(e) {
        if (!this.isDrawing) return;
        const pos = this.getPos(e);

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();

        this.lastX = pos.x;
        this.lastY = pos.y;
        this.hasStrokes = true;
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    clear() {
        this.resetCanvasState();
    }

    isEmpty() {
        return !this.hasStrokes;
    }

    getImageDataUrl() {
        return this.canvas.toDataURL('image/png');
    }
}
