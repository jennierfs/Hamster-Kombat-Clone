import { useGameStore } from '../store/gameStore';
import { binanceLogo, dollarCoin } from '../images';
import FalcoX from '../icons/Hamster';
import Info from '../icons/Info';
import Settings from '../icons/Settings';
import { LEVEL_NAMES, LEVEL_MIN_POINTS } from '../utils/constants';
import { useState } from 'react';
import SettingsModal from './SettingsModal';

const TopBar = () => {
  const { points, levelIndex, profitPerHour, username } = useGameStore();
  const [showSettings, setShowSettings] = useState(false);

  const calculateProgress = () => {
    if (levelIndex >= LEVEL_NAMES.length - 1) {
      return 100;
    }
    const currentLevelMin = LEVEL_MIN_POINTS[levelIndex];
    const nextLevelMin = LEVEL_MIN_POINTS[levelIndex + 1];
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const formatProfitPerHour = (profit: number) => {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  };

  return (
    <>
      <div className="px-4 z-10">
        <div className="flex items-center space-x-2 pt-4">
          <div className="p-1 rounded-lg bg-[#1d2025]">
            <FalcoX size={24} className="text-[#d4d4d4]" />
          </div>
          <div>
            <p className="text-sm">{username} (CEO)</p>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-4 mt-1">
          <div className="flex items-center w-1/3">
            <div className="w-full">
              <div className="flex justify-between">
                <p className="text-sm">{LEVEL_NAMES[levelIndex]}</p>
                <p className="text-sm">
                  {levelIndex + 1}{' '}
                  <span className="text-[#95908a]">/ {LEVEL_NAMES.length}</span>
                </p>
              </div>
              <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                  <div
                    className="progress-gradient h-2 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
            <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
            <div className="flex-1 text-center">
              <p className="text-xs text-[#85827d] font-medium">Profit per hour</p>
              <div className="flex items-center justify-center space-x-1">
                <img src={dollarCoin} alt="Dollar Coin" className="w-5 h-5" />
                <p className="text-sm">{formatProfitPerHour(profitPerHour)}</p>
                <Info size={20} className="text-[#43433b]" />
              </div>
            </div>
            <button onClick={() => setShowSettings(true)}>
              <Settings className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </>
  );
};

export default TopBar;
