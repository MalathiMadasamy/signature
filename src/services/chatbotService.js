/**
 * DetectiSign Signature Verification AI Assistant Service
 * Provides domain-specific signature verification answers and rule matching
 */

export const FAQ_QUESTIONS = [
  "What is signature verification?",
  "How does DetectiSign work?",
  "How is similarity calculated?",
  "What does a low similarity score mean?",
  "What image formats are supported?",
  "Can AI guarantee that a signature is genuine?",
  "Why should a human review the result?"
];

export const getBotResponse = (userQuery) => {
  const query = userQuery.toLowerCase().trim();

  if (query.includes('what is signature verification') || query.includes('what is signature')) {
    return "Signature verification is an automated or manual biometric process used to determine whether a submitted signature matches a known authentic reference signature. DetectiSign uses computer vision and structural similarity analysis to evaluate handwritten patterns.";
  }

  if (query.includes('how does detectisign work') || query.includes('how it works') || query.includes('process')) {
    return "DetectiSign operates in 4 steps:\n1. Upload a known Genuine Reference Signature.\n2. Upload the Questioned Signature to verify.\n3. The AI engine applies binarization, centroid alignment, and stroke density extraction.\n4. It calculates an overall similarity percentage and classifies the result into 'Likely Genuine', 'Needs Review', or 'Potentially Forged'.";
  }

  if (query.includes('similarity calculated') || query.includes('calculate') || query.includes('score')) {
    return "Similarity is calculated using a multi-factor structural comparison:\n• Stroke Similarity (35%): Measures line thickness and pen pressure curves.\n• Shape Similarity (25%): Evaluates outer geometric contour.\n• Structure Similarity (25%): Measures SSIM pixel matrix match.\n• Writing Pattern (15%): Assesses baseline angle and centroid orientation.";
  }

  if (query.includes('low similarity') || query.includes('32%') || query.includes('potentially forged')) {
    return "A low similarity score (below 50%) indicates significant structural differences between the submitted signature and the reference baseline. This suggests potential forgery, severe writing tremor, or a completely different signer. Such cases are flagged as 'Potentially Forged'.";
  }

  if (query.includes('format') || query.includes('image format') || query.includes('upload type')) {
    return "DetectiSign supports standard image formats including PNG, JPG, and JPEG files up to 5MB. For best results, use high-contrast images with clean backgrounds.";
  }

  if (query.includes('guarantee') || query.includes('legal proof') || query.includes('100%')) {
    return "No AI system can provide 100% absolute legal guarantee. DetectiSign provides an automated screening score intended to assist document examiners. For court cases or high-stakes financial decisions, an authorized forensic handwriting expert must perform final verification.";
  }

  if (query.includes('human review') || query.includes('why human') || query.includes('expert')) {
    return "Human review is essential because genuine signatures naturally vary due to illness, age, fatigue, surface angle, or pen type. Human forensic experts consider contextual evidence alongside AI biometric screening.";
  }

  if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
    return "Hello! I am the DetectiSign AI Assistant. I specialize in answering questions about signature verification, computer vision, forgery detection, and similarity scores. How can I help you today?";
  }

  // Fallback response for signature verification domain
  return "I am the DetectiSign Signature Verification Assistant. I can help explain signature feature extraction, SSIM similarity scores, forgery screening, supported image formats, and human-in-the-loop review recommendations. Feel free to click any suggested question below!";
};
