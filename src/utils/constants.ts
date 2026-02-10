// Level configuration
export const LEVEL_NAMES = [
  "Bronze",      // from 0 to 4999 coins
  "Silver",      // from 5000 coins to 24,999 coins
  "Gold",        // from 25,000 coins to 99,999 coins
  "Platinum",    // from 100,000 coins to 999,999 coins
  "Diamond",     // from 1,000,000 coins to 1,999,999 coins
  "Epic",        // from 2,000,000 coins to 9,999,999 coins
  "Legendary",   // from 10,000,000 coins to 49,999,999 coins
  "Master",      // from 50,000,000 coins to 99,999,999 coins
  "GrandMaster", // from 100,000,000 coins to 999,999,999 coins
  "Lord",        // from 1,000,000,000 coins to infinity
];

export const LEVEL_MIN_POINTS = [
  0,           // bronze
  5000,        // silver
  25000,       // gold
  100000,      // platinum
  1000000,     // diamond
  2000000,     // epic
  10000000,    // legendary
  50000000,    // master
  100000000,   // grandMaster
  1000000000,  // lord
];

// Initial game values
export const INITIAL_POINTS = 0;
export const INITIAL_POINTS_TO_ADD = 1;
export const INITIAL_PROFIT_PER_HOUR = 0;
export const INITIAL_ENERGY = 1000;
export const MAX_ENERGY = 1000;
export const ENERGY_RECOVERY_RATE = 1; // per second

// Storage keys
export const STORAGE_KEY = 'falco_x_game_state';

// Token contract
export const TOKEN_CONTRACT = '0xb957D98a9a57AfbBf7944f3616CdB4802eb2E646';
