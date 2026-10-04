/**
 * DetectiSign Sample Signature Dataset Generator
 * Generates realistic SVG data URLs for instant demo testing
 */

const SampleDataset = {
    // Helper to render SVG paths into base64 Data URLs
    svgToDataUrl: function(pathsSvg) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" width="500" height="200">
            <rect width="100%" height="100%" fill="#ffffff"/>
            <g stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
                ${pathsSvg}
            </g>
        </svg>`;
        return 'data:image/svg+xml;base64,' + btoa(svg);
    },

    // User 1 Genuine Signature Base (Signature "Alexander Vance")
    getUser1Genuine1: function() {
        return this.svgToDataUrl(`
            <!-- Main A initial swoop -->
            <path d="M 60 140 C 50 80, 80 40, 110 50 C 130 60, 90 150, 120 150 C 140 150, 160 90, 180 80" />
            <path d="M 80 110 Q 130 115, 170 100" />
            <!-- V loop -->
            <path d="M 190 90 C 200 60, 220 50, 230 90 C 240 130, 260 140, 270 70" />
            <!-- Flowing baseline tail and loops -->
            <path d="M 270 100 C 290 120, 310 120, 330 95 C 340 80, 360 85, 380 120 C 400 135, 430 110, 460 105" />
            <!-- Underline accent -->
            <path d="M 50 160 C 150 155, 300 165, 470 150" stroke-width="2.5" />
            <path d="M 440 140 L 460 145" />
        `);
    },

    // User 1 Genuine Signature Second Sample (Natural Variation)
    getUser1Genuine2: function() {
        return this.svgToDataUrl(`
            <!-- Main A initial swoop (slightly different angle/scale) -->
            <path d="M 58 142 C 48 78, 82 38, 112 48 C 132 58, 88 152, 118 152 C 138 152, 162 88, 182 78" />
            <path d="M 78 112 Q 128 113, 168 98" />
            <!-- V loop -->
            <path d="M 192 92 C 202 62, 222 48, 232 88 C 242 128, 262 138, 272 68" />
            <!-- Flowing baseline tail and loops -->
            <path d="M 272 98 C 292 118, 312 118, 332 93 C 342 78, 362 83, 382 118 C 402 133, 432 108, 462 103" />
            <!-- Underline accent -->
            <path d="M 52 162 C 152 157, 302 167, 468 152" stroke-width="2.5" />
            <path d="M 438 142 L 458 147" />
        `);
    },

    // Skilled Forgery of User 1 (Shaky lines, distorted loops, wrong baseline angle)
    getUser1Forged: function() {
        return this.svgToDataUrl(`
            <!-- Shaky A initial swoop -->
            <path d="M 65 130 C 55 90, 75 55, 100 65 C 115 70, 95 135, 115 140 C 130 140, 150 100, 175 90" stroke-width="4" />
            <path d="M 85 118 Q 120 120, 160 110" />
            <!-- Distorted V loop -->
            <path d="M 185 100 C 190 75, 210 65, 220 100 C 230 135, 245 145, 255 85" />
            <!-- Compressed tail -->
            <path d="M 255 110 C 275 130, 290 125, 310 105 C 320 95, 340 100, 360 135 C 380 145, 410 130, 440 125" />
            <!-- Misaligned underline -->
            <path d="M 60 175 C 160 170, 290 175, 440 165" stroke-width="3" />
        `);
    },

    // User 2 Genuine Signature Base ("Dr. Maya Lin")
    getUser2Genuine: function() {
        return this.svgToDataUrl(`
            <!-- Sharp M loop -->
            <path d="M 70 150 L 85 60 L 110 120 L 135 65 L 160 150" stroke-width="4"/>
            <path d="M 160 110 C 180 80, 210 80, 230 110 C 250 140, 280 90, 310 80" />
            <circle cx="330" cy="75" r="4" fill="#0f172a" />
            <path d="M 340 120 C 370 60, 420 60, 450 130" stroke-width="3" />
        `);
    },

    // Random Forgery (Completely different name "Robert Smith")
    getRandomForged: function() {
        return this.svgToDataUrl(`
            <!-- Big R -->
            <path d="M 80 160 L 80 60 C 120 50, 160 70, 140 110 C 120 130, 80 110, 80 110 L 160 160" stroke-width="4"/>
            <!-- cursive smith -->
            <path d="M 180 130 C 200 110, 220 140, 240 120 C 260 100, 270 150, 290 120 C 310 100, 330 140, 350 120 L 350 70" />
            <path d="M 330 90 L 370 90" />
            <!-- Underline -->
            <path d="M 70 175 Q 250 185, 400 170" />
        `);
    }
};
