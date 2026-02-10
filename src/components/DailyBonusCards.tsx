import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { dailyReward, dailyCipher, dailyCombo } from '../images';
import { calculateTimeLeft } from '../utils/dailyBonuses';

interface DailyBonusCardsProps {
  onOpenReward: () => void;
  onOpenCipher: () => void;
  onOpenCombo: () => void;
}

const DailyBonusCards = ({ onOpenReward, onOpenCipher, onOpenCombo }: DailyBonusCardsProps) => {
  const { dailyCipher: cipher, dailyCombo: combo, lastDailyRewardClaim } = useGameStore();
  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState('');
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState('');

  const canClaimReward = !lastDailyRewardClaim || Date.now() - lastDailyRewardClaim >= 24 * 60 * 60 * 1000;

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 mt-6 flex justify-between gap-2">
      <button
        onClick={onOpenReward}
        className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative hover:bg-[#323539] transition-colors"
      >
        {canClaimReward && <div className="dot"></div>}
        <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />
        <p className="text-[10px] text-center text-white mt-1">Daily reward</p>
        <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
          {dailyRewardTimeLeft}
        </p>
      </button>

      <button
        onClick={onOpenCipher}
        className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative hover:bg-[#323539] transition-colors"
      >
        {cipher && !cipher.solved && <div className="dot"></div>}
        <img src={dailyCipher} alt="Daily Cipher" className="mx-auto w-12 h-12" />
        <p className="text-[10px] text-center text-white mt-1">Daily cipher</p>
        <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
          {cipher?.solved ? '✓ Solved' : dailyCipherTimeLeft}
        </p>
      </button>

      <button
        onClick={onOpenCombo}
        className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative hover:bg-[#323539] transition-colors"
      >
        {combo && !combo.solved && <div className="dot"></div>}
        <img src={dailyCombo} alt="Daily Combo" className="mx-auto w-12 h-12" />
        <p className="text-[10px] text-center text-white mt-1">Daily combo</p>
        <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
          {combo?.solved ? '✓ Found' : `${combo?.found.length || 0}/3`}
        </p>
      </button>
    </div>
  );
};

export default DailyBonusCards;
