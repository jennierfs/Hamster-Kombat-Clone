export type IconProps = {
  size?: number;
  className?: string;
};

export interface UpgradeCard {
  id: string;
  name: string;
  description: string;
  category: 'markets' | 'pr' | 'team' | 'legal' | 'specials';
  basePrice: number;
  baseProfitPerHour: number;
  level: number;
  maxLevel: number;
  requiredCardId?: string;
  requiredCardLevel?: number;
  image: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  type: 'daily' | 'social' | 'special' | 'onetime';
  completed: boolean;
  claimed: boolean;
  link?: string;
  icon: string;
}

export interface Referral {
  id: string;
  name: string;
  points: number;
  joinedAt: number;
  avatarUrl?: string;
}

export interface DailyReward {
  day: number;
  reward: number;
  claimed: boolean;
}

export interface DailyCipher {
  word: string;
  letters: string[];
  solved: boolean;
  reward: number;
}

export interface DailyCombo {
  cards: string[];
  found: string[];
  solved: boolean;
  reward: number;
}

export interface GameState {
  // User info
  oderId: string;
  username: string;
  
  // Points and levels
  points: number;
  totalEarned: number;
  levelIndex: number;
  
  // Tap mechanics
  pointsToAdd: number;
  energy: number;
  maxEnergy: number;
  energyRecoveryRate: number;
  lastEnergyUpdate: number;
  
  // Passive income
  profitPerHour: number;
  lastProfitUpdate: number;
  
  // Upgrades
  upgrades: UpgradeCard[];
  
  // Tasks
  tasks: Task[];
  
  // Referrals
  referrals: Referral[];
  referralCode: string;
  referralBonus: number;
  
  // Daily bonuses
  dailyRewards: DailyReward[];
  currentDailyStreak: number;
  lastDailyRewardClaim: number;
  
  dailyCipher: DailyCipher | null;
  lastCipherReset: number;
  
  dailyCombo: DailyCombo | null;
  lastComboReset: number;
  
  // Airdrop
  airdropTokens: number;
  
  // Settings
  vibrationEnabled: boolean;
  soundEnabled: boolean;
}