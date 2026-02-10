import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState } from '../utils/types';
import { 
  LEVEL_MIN_POINTS,
  STORAGE_KEY,
  INITIAL_POINTS,
  INITIAL_POINTS_TO_ADD,
  INITIAL_PROFIT_PER_HOUR,
  INITIAL_ENERGY,
  MAX_ENERGY,
  ENERGY_RECOVERY_RATE
} from '../utils/constants';
import { initialUpgrades } from '../data/upgrades';
import { initialTasks } from '../data/tasks';
import { generateDailyRewards, generateDailyCipher, generateDailyCombo } from '../utils/dailyBonuses';

interface GameActions {
  // Tap actions
  tap: (count?: number) => void;
  
  // Energy actions
  updateEnergy: () => void;
  
  // Passive income
  collectPassiveIncome: () => void;
  
  // Upgrade actions
  purchaseUpgrade: (upgradeId: string) => boolean;
  
  // Task actions
  completeTask: (taskId: string) => void;
  claimTaskReward: (taskId: string) => void;
  
  // Referral actions
  addReferral: (name: string, oderId: string) => void;
  
  // Daily bonus actions
  claimDailyReward: () => boolean;
  solveDailyCipher: (answer: string) => boolean;
  selectComboCard: (cardId: string) => boolean;
  
  // Settings
  toggleVibration: () => void;
  toggleSound: () => void;
  
  // User info
  setUserInfo: (name: string, oderId: string) => void;
  
  // Reset
  resetGame: () => void;
  
  // Utility
  calculateLevel: () => void;
  formatNumber: (num: number) => string;
}

const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const initialState: GameState = {
  oderId: '',
  username: 'CEO',
  points: INITIAL_POINTS,
  totalEarned: INITIAL_POINTS,
  levelIndex: 0,
  pointsToAdd: INITIAL_POINTS_TO_ADD,
  energy: INITIAL_ENERGY,
  maxEnergy: MAX_ENERGY,
  energyRecoveryRate: ENERGY_RECOVERY_RATE,
  lastEnergyUpdate: Date.now(),
  profitPerHour: INITIAL_PROFIT_PER_HOUR,
  lastProfitUpdate: Date.now(),
  upgrades: initialUpgrades,
  tasks: initialTasks,
  referrals: [],
  referralCode: generateReferralCode(),
  referralBonus: 5000,
  dailyRewards: generateDailyRewards(),
  currentDailyStreak: 0,
  lastDailyRewardClaim: 0,
  dailyCipher: generateDailyCipher(),
  lastCipherReset: Date.now(),
  dailyCombo: generateDailyCombo(),
  lastComboReset: Date.now(),
  airdropTokens: 0,
  vibrationEnabled: true,
  soundEnabled: true,
};

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      tap: (count = 1) => {
        const state = get();
        const actualTaps = Math.min(count, state.energy);
        
        if (actualTaps <= 0) return;
        
        const pointsEarned = actualTaps * state.pointsToAdd;
        
        set({
          points: state.points + pointsEarned,
          totalEarned: state.totalEarned + pointsEarned,
          energy: state.energy - actualTaps,
        });
        
        get().calculateLevel();
        
        // Trigger vibration if enabled
        if (state.vibrationEnabled && navigator.vibrate) {
          navigator.vibrate(10);
        }
      },

      updateEnergy: () => {
        const state = get();
        const now = Date.now();
        const timePassed = (now - state.lastEnergyUpdate) / 1000;
        const energyToRecover = Math.floor(timePassed * state.energyRecoveryRate);
        
        if (energyToRecover > 0) {
          set({
            energy: Math.min(state.energy + energyToRecover, state.maxEnergy),
            lastEnergyUpdate: now,
          });
        }
      },

      collectPassiveIncome: () => {
        const state = get();
        const now = Date.now();
        const hoursPassed = (now - state.lastProfitUpdate) / (1000 * 60 * 60);
        const profitEarned = Math.floor(hoursPassed * state.profitPerHour);
        
        if (profitEarned > 0) {
          set({
            points: state.points + profitEarned,
            totalEarned: state.totalEarned + profitEarned,
            lastProfitUpdate: now,
          });
          
          get().calculateLevel();
        }
      },

      purchaseUpgrade: (upgradeId: string) => {
        const state = get();
        const upgradeIndex = state.upgrades.findIndex(u => u.id === upgradeId);
        
        if (upgradeIndex === -1) return false;
        
        const upgrade = state.upgrades[upgradeIndex];
        
        // Check if max level reached
        if (upgrade.level >= upgrade.maxLevel) return false;
        
        // Calculate price for next level
        const price = Math.floor(upgrade.basePrice * Math.pow(1.5, upgrade.level));
        
        // Check if player has enough points
        if (state.points < price) return false;
        
        // Check if required card level is met
        if (upgrade.requiredCardId) {
          const requiredCard = state.upgrades.find(u => u.id === upgrade.requiredCardId);
          if (!requiredCard || requiredCard.level < (upgrade.requiredCardLevel || 1)) {
            return false;
          }
        }
        
        // Calculate profit increase
        const profitIncrease = Math.floor(upgrade.baseProfitPerHour * Math.pow(1.2, upgrade.level));
        
        // Update state
        const newUpgrades = [...state.upgrades];
        newUpgrades[upgradeIndex] = {
          ...upgrade,
          level: upgrade.level + 1,
        };
        
        set({
          points: state.points - price,
          profitPerHour: state.profitPerHour + profitIncrease,
          upgrades: newUpgrades,
        });
        
        return true;
      },

      completeTask: (taskId: string) => {
        const state = get();
        const taskIndex = state.tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex === -1) return;
        
        const newTasks = [...state.tasks];
        newTasks[taskIndex] = {
          ...newTasks[taskIndex],
          completed: true,
        };
        
        set({ tasks: newTasks });
      },

      claimTaskReward: (taskId: string) => {
        const state = get();
        const taskIndex = state.tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex === -1) return;
        
        const task = state.tasks[taskIndex];
        
        if (!task.completed || task.claimed) return;
        
        const newTasks = [...state.tasks];
        newTasks[taskIndex] = {
          ...newTasks[taskIndex],
          claimed: true,
        };
        
        set({
          points: state.points + task.reward,
          totalEarned: state.totalEarned + task.reward,
          tasks: newTasks,
        });
        
        get().calculateLevel();
      },

      addReferral: (name: string, oderId: string) => {
        const state = get();
        
        // Check if already referred
        if (state.referrals.some(r => r.id === oderId)) return;
        
        const newReferral = {
          id: oderId,
          name,
          points: 0,
          joinedAt: Date.now(),
        };
        
        set({
          referrals: [...state.referrals, newReferral],
          points: state.points + state.referralBonus,
          totalEarned: state.totalEarned + state.referralBonus,
        });
        
        get().calculateLevel();
      },

      claimDailyReward: () => {
        const state = get();
        const now = Date.now();
        const lastClaim = state.lastDailyRewardClaim;
        const oneDayMs = 24 * 60 * 60 * 1000;
        
        // Check if already claimed today
        if (lastClaim && now - lastClaim < oneDayMs) {
          return false;
        }
        
        // Check if streak is broken (more than 48 hours since last claim)
        let newStreak = state.currentDailyStreak;
        if (lastClaim && now - lastClaim > 2 * oneDayMs) {
          newStreak = 0;
        }
        
        const dayIndex = newStreak % state.dailyRewards.length;
        const reward = state.dailyRewards[dayIndex].reward;
        
        const newDailyRewards = [...state.dailyRewards];
        newDailyRewards[dayIndex] = {
          ...newDailyRewards[dayIndex],
          claimed: true,
        };
        
        set({
          points: state.points + reward,
          totalEarned: state.totalEarned + reward,
          currentDailyStreak: newStreak + 1,
          lastDailyRewardClaim: now,
          dailyRewards: newDailyRewards,
        });
        
        get().calculateLevel();
        return true;
      },

      solveDailyCipher: (answer: string) => {
        const state = get();
        
        if (!state.dailyCipher || state.dailyCipher.solved) return false;
        
        if (answer.toUpperCase() === state.dailyCipher.word.toUpperCase()) {
          set({
            points: state.points + state.dailyCipher.reward,
            totalEarned: state.totalEarned + state.dailyCipher.reward,
            dailyCipher: {
              ...state.dailyCipher,
              solved: true,
            },
          });
          
          get().calculateLevel();
          return true;
        }
        
        return false;
      },

      selectComboCard: (cardId: string) => {
        const state = get();
        
        if (!state.dailyCombo || state.dailyCombo.solved) return false;
        
        // Check if card is already selected
        if (state.dailyCombo.found.includes(cardId)) return false;
        
        // Check if card is part of the combo
        if (!state.dailyCombo.cards.includes(cardId)) return false;
        
        const newFound = [...state.dailyCombo.found, cardId];
        const solved = newFound.length === state.dailyCombo.cards.length;
        
        set({
          dailyCombo: {
            ...state.dailyCombo,
            found: newFound,
            solved,
          },
        });
        
        if (solved) {
          set({
            points: get().points + state.dailyCombo.reward,
            totalEarned: get().totalEarned + state.dailyCombo.reward,
          });
          get().calculateLevel();
        }
        
        return true;
      },

      toggleVibration: () => {
        set(state => ({ vibrationEnabled: !state.vibrationEnabled }));
      },

      toggleSound: () => {
        set(state => ({ soundEnabled: !state.soundEnabled }));
      },

      setUserInfo: (name: string, oderId: string) => {
        set({ username: name, oderId });
      },

      resetGame: () => {
        set({
          ...initialState,
          referralCode: generateReferralCode(),
          dailyRewards: generateDailyRewards(),
          dailyCipher: generateDailyCipher(),
          dailyCombo: generateDailyCombo(),
        });
      },

      calculateLevel: () => {
        const state = get();
        let newLevelIndex = 0;
        
        for (let i = LEVEL_MIN_POINTS.length - 1; i >= 0; i--) {
          if (state.points >= LEVEL_MIN_POINTS[i]) {
            newLevelIndex = i;
            break;
          }
        }
        
        if (newLevelIndex !== state.levelIndex) {
          set({ levelIndex: newLevelIndex });
        }
      },

      formatNumber: (num: number) => {
        if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
        if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
        return num.toString();
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        oderId: state.oderId,
        username: state.username,
        points: state.points,
        totalEarned: state.totalEarned,
        levelIndex: state.levelIndex,
        pointsToAdd: state.pointsToAdd,
        energy: state.energy,
        maxEnergy: state.maxEnergy,
        energyRecoveryRate: state.energyRecoveryRate,
        lastEnergyUpdate: state.lastEnergyUpdate,
        profitPerHour: state.profitPerHour,
        lastProfitUpdate: state.lastProfitUpdate,
        upgrades: state.upgrades,
        tasks: state.tasks,
        referrals: state.referrals,
        referralCode: state.referralCode,
        referralBonus: state.referralBonus,
        dailyRewards: state.dailyRewards,
        currentDailyStreak: state.currentDailyStreak,
        lastDailyRewardClaim: state.lastDailyRewardClaim,
        dailyCipher: state.dailyCipher,
        lastCipherReset: state.lastCipherReset,
        dailyCombo: state.dailyCombo,
        lastComboReset: state.lastComboReset,
        airdropTokens: state.airdropTokens,
        vibrationEnabled: state.vibrationEnabled,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
