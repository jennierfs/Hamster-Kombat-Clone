import { DailyReward, DailyCipher, DailyCombo } from './types';

export const generateDailyRewards = (): DailyReward[] => {
  const rewards = [
    500,     // Day 1
    1000,    // Day 2
    2500,    // Day 3
    5000,    // Day 4
    15000,   // Day 5
    25000,   // Day 6
    100000,  // Day 7
    500000,  // Day 8
    1000000, // Day 9
    5000000, // Day 10
  ];

  return rewards.map((reward, index) => ({
    day: index + 1,
    reward,
    claimed: false,
  }));
};

const CIPHER_WORDS = [
  'HODL',
  'MOON',
  'PUMP',
  'DUMP',
  'DEFI',
  'YIELD',
  'STAKE',
  'SWAP',
  'MINT',
  'BURN',
  'FOMO',
  'WHALE',
  'LAMBO',
  'REKT',
  'SHILL',
  'BAGS',
  'DYOR',
  'NGMI',
  'WAGMI',
  'ALPHA',
];

export const generateDailyCipher = (): DailyCipher => {
  const word = CIPHER_WORDS[Math.floor(Math.random() * CIPHER_WORDS.length)];
  const letters = word.split('');
  
  return {
    word,
    letters,
    solved: false,
    reward: 1000000,
  };
};

const COMBO_CARDS = [
  ['fan-tokens', 'staking', 'btc-pairs'],
  ['ceo', 'marketing', 'it-team'],
  ['kyc-system', 'aml-compliance', 'license-eu'],
  ['hamster-nft', 'vip-program', 'launchpad'],
  ['eth-pairs', 'defi-tokens', 'gamefi-tokens'],
  ['security-team', 'support-team', 'ux-team'],
  ['meme-coins', 'top-10-coins', 'btc-pairs'],
  ['mobile-app', 'trading-bot', 'it-team'],
];

export const generateDailyCombo = (): DailyCombo => {
  const combo = COMBO_CARDS[Math.floor(Math.random() * COMBO_CARDS.length)];
  
  return {
    cards: combo,
    found: [],
    solved: false,
    reward: 5000000,
  };
};

export const calculateTimeLeft = (targetHour: number): string => {
  const now = new Date();
  const target = new Date(now);
  target.setUTCHours(targetHour, 0, 0, 0);

  if (now.getUTCHours() >= targetHour) {
    target.setUTCDate(target.getUTCDate() + 1);
  }

  const diff = target.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}`;
};
