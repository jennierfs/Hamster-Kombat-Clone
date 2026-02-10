import { useGameStore } from '../store/gameStore';
import { dollarCoin } from '../images';

interface DailyRewardModalProps {
  onClose: () => void;
}

const DailyRewardModal = ({ onClose }: DailyRewardModalProps) => {
  const { dailyRewards, currentDailyStreak, claimDailyReward, lastDailyRewardClaim } = useGameStore();
  
  const canClaim = !lastDailyRewardClaim || Date.now() - lastDailyRewardClaim >= 24 * 60 * 60 * 1000;
  const currentDay = currentDailyStreak % dailyRewards.length;

  const handleClaim = () => {
    if (claimDailyReward()) {
      setTimeout(onClose, 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#1d2025] rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Daily Reward</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
            ×
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-4 text-center">
          Collect coins for logging in daily without skipping
        </p>

        <div className="text-center mb-4">
          <p className="text-white">Current Streak: <span className="text-yellow-400 font-bold">{currentDailyStreak} days</span></p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-6">
          {dailyRewards.map((reward, index) => (
            <div
              key={reward.day}
              className={`p-2 rounded-lg text-center ${
                index < currentDay
                  ? 'bg-green-600/30 border border-green-500'
                  : index === currentDay
                  ? 'bg-yellow-600/30 border-2 border-yellow-500'
                  : 'bg-[#272a2f]'
              }`}
            >
              <p className="text-xs text-gray-400">Day {reward.day}</p>
              <img src={dollarCoin} alt="Coin" className="w-6 h-6 mx-auto my-1" />
              <p className="text-xs text-white font-bold">
                {reward.reward >= 1000000
                  ? `${(reward.reward / 1000000).toFixed(0)}M`
                  : reward.reward >= 1000
                  ? `${(reward.reward / 1000).toFixed(0)}K`
                  : reward.reward}
              </p>
              {index < currentDay && <span className="text-green-500 text-xs">✓</span>}
            </div>
          ))}
        </div>

        <button
          onClick={handleClaim}
          disabled={!canClaim}
          className={`w-full py-4 rounded-xl font-bold text-white transition-colors ${
            canClaim
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          {canClaim ? `Claim ${dailyRewards[currentDay]?.reward.toLocaleString()} coins` : 'Come back tomorrow'}
        </button>
      </div>
    </div>
  );
};

export default DailyRewardModal;
