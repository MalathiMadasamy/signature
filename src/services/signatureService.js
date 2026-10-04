/**
 * DetectiSign Signature Verification Service
 * Decoupled API service designed for future AI/ML backend integration (Flask/FastAPI/TensorFlow/PyTorch)
 */

export const verifySignature = async (referenceImage, testImage) => {
  // Simulate network latency for realistic AI inference demo
  await new Promise((resolve) => setTimeout(resolve, 2200));

  // Extract metadata / length for deterministic mock comparison
  const refLen = referenceImage ? referenceImage.length : 1000;
  const testLen = testImage ? testImage.length : 1000;
  
  // Calculate deterministic score based on image content properties
  const seed = Math.abs((refLen % 97) - (testLen % 97)) + (refLen % 13);
  
  // Hash check for preset demo pairs
  let overallSimilarity = 0;
  let resultStatus = '';
  let confidence = 'High';
  let explanation = '';

  // Calculate realistic factor scores
  let strokeSimilarity = Math.max(15, Math.min(98, 85 - (seed * 2.5) + (refLen % 11)));
  let shapeSimilarity = Math.max(18, Math.min(99, 88 - (seed * 2.1) + (testLen % 9)));
  let structureSimilarity = Math.max(12, Math.min(97, 82 - (seed * 2.8) + ((refLen + testLen) % 7)));
  let writingPattern = Math.max(20, Math.min(96, 86 - (seed * 1.9) + (seed % 5)));

  overallSimilarity = Math.round(
    strokeSimilarity * 0.35 +
    shapeSimilarity * 0.25 +
    structureSimilarity * 0.25 +
    writingPattern * 0.15
  );

  // Classify threshold
  if (overallSimilarity >= 80) {
    resultStatus = 'Likely Genuine';
    confidence = 'High';
    explanation = 'The submitted signature shows strong visual and structural similarity with the reference signature across all key biometric metrics.';
  } else if (overallSimilarity >= 50) {
    resultStatus = 'Needs Review';
    confidence = 'Medium';
    explanation = 'The signature has partial visual similarity. Minor stroke deviations or baseline skews detected. Additional human expert review is recommended.';
  } else {
    resultStatus = 'Potentially Forged';
    confidence = 'High';
    explanation = 'The submitted signature shows significant structural differences, irregular stroke density, or baseline misalignment compared to the reference signature.';
  }

  const verificationRecord = {
    id: `DS-${Math.floor(100 + Math.random() * 900)}`,
    timestamp: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }),
    date: new Date().toISOString().split('T')[0],
    similarity: overallSimilarity,
    resultStatus: resultStatus,
    confidence: confidence,
    explanation: explanation,
    factors: {
      strokeSimilarity: Math.round(strokeSimilarity),
      shapeSimilarity: Math.round(shapeSimilarity),
      structureSimilarity: Math.round(structureSimilarity),
      writingPattern: Math.round(writingPattern)
    },
    referencePreview: referenceImage,
    testPreview: testImage,
    isDemoAnalysis: true
  };

  return verificationRecord;
};
