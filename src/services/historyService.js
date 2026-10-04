/**
 * DetectiSign Verification History Service (LocalStorage)
 */

const HISTORY_KEY = 'detectisign_history_records';

const defaultSeedHistory = [
  {
    id: 'DS-001',
    date: '24 Sep 2026',
    timestamp: '24 Sep 2026, 10:15 AM',
    similarity: 91,
    resultStatus: 'Likely Genuine',
    confidence: 'High',
    explanation: 'The submitted signature shows strong visual similarity with the reference signature.',
    factors: { strokeSimilarity: 93, shapeSimilarity: 90, structureSimilarity: 89, writingPattern: 92 }
  },
  {
    id: 'DS-002',
    date: '24 Sep 2026',
    timestamp: '24 Sep 2026, 11:42 AM',
    similarity: 32,
    resultStatus: 'Potentially Forged',
    confidence: 'High',
    explanation: 'The submitted signature shows significant differences from the reference signature.',
    factors: { strokeSimilarity: 28, shapeSimilarity: 35, structureSimilarity: 31, writingPattern: 34 }
  },
  {
    id: 'DS-003',
    date: '24 Sep 2026',
    timestamp: '24 Sep 2026, 02:20 PM',
    similarity: 67,
    resultStatus: 'Needs Review',
    confidence: 'Medium',
    explanation: 'The signature has partial similarity. Additional human verification is recommended.',
    factors: { strokeSimilarity: 65, shapeSimilarity: 71, structureSimilarity: 64, writingPattern: 68 }
  }
];

export const getHistory = () => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (!data) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(defaultSeedHistory));
      return defaultSeedHistory;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load history from LocalStorage', e);
    return defaultSeedHistory;
  }
};

export const saveHistoryRecord = (record) => {
  try {
    const current = getHistory();
    const updated = [record, ...current];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save history record', e);
    return [];
  }
};

export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return [];
  } catch (e) {
    console.error('Failed to clear history', e);
    return [];
  }
};

export const getDashboardStats = () => {
  const history = getHistory();
  const total = history.length;
  const genuine = history.filter((h) => h.resultStatus === 'Likely Genuine').length;
  const review = history.filter((h) => h.resultStatus === 'Needs Review').length;
  const forged = history.filter((h) => h.resultStatus === 'Potentially Forged').length;

  return {
    total,
    genuine,
    review,
    forged,
    history
  };
};
