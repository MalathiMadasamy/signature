/**
 * Mock Signature Data URLs for 1-click Demo Testing
 */

const svgToDataUrl = (pathsSvg) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" width="500" height="200">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <g stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
          ${pathsSvg}
      </g>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
};

export const MOCK_SIGNATURES = {
  referenceGenuine: svgToDataUrl(`
    <path d="M 60 140 C 50 80, 80 40, 110 50 C 130 60, 90 150, 120 150 C 140 150, 160 90, 180 80" />
    <path d="M 80 110 Q 130 115, 170 100" />
    <path d="M 190 90 C 200 60, 220 50, 230 90 C 240 130, 260 140, 270 70" />
    <path d="M 270 100 C 290 120, 310 120, 330 95 C 340 80, 360 85, 380 120 C 400 135, 430 110, 460 105" />
    <path d="M 50 160 C 150 155, 300 165, 470 150" stroke-width="2.5" />
  `),

  testGenuine: svgToDataUrl(`
    <path d="M 58 142 C 48 78, 82 38, 112 48 C 132 58, 88 152, 118 152 C 138 152, 162 88, 182 78" />
    <path d="M 78 112 Q 128 113, 168 98" />
    <path d="M 192 92 C 202 62, 222 48, 232 88 C 242 128, 262 138, 272 68" />
    <path d="M 272 98 C 292 118, 312 118, 332 93 C 342 78, 362 83, 382 118 C 402 133, 432 108, 462 103" />
    <path d="M 52 162 C 152 157, 302 167, 468 152" stroke-width="2.5" />
  `),

  testForged: svgToDataUrl(`
    <path d="M 65 130 C 55 90, 75 55, 100 65 C 115 70, 95 135, 115 140 C 130 140, 150 100, 175 90" stroke-width="4" />
    <path d="M 85 118 Q 120 120, 160 110" />
    <path d="M 185 100 C 190 75, 210 65, 220 100 C 230 135, 245 145, 255 85" />
    <path d="M 255 110 C 275 130, 290 125, 310 105 C 320 95, 340 100, 360 135 C 380 145, 410 130, 440 125" />
    <path d="M 60 175 C 160 170, 290 175, 440 165" stroke-width="3" />
  `)
};
