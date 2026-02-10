import { useGameStore } from '../store/gameStore';
import { dollarCoin } from '../images';

interface DailyComboModalProps {
  onClose: () => void;
}

const DailyComboModal = ({ onClose }: DailyComboModalProps) => {
  const { dailyCombo, upgrades } = useGameStore();

  if (!dailyCombo) return null;

  const comboCards = dailyCombo.cards.map(cardId => 
    upgrades.find(u => u.id === cardId)
  ).filter(Boolean);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#1d2025] rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Daily Combo</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
            ×
          </button>
        </div>

        {dailyCombo.solved ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-green-500 font-bold text-xl">Combo Found!</p>
            <div className="flex items-center justify-center mt-4">
              <img src={dollarCoin} alt="Coin" className="w-8 h-8 mr-2" />
              <span className="text-white font-bold text-xl">
                +{dailyCombo.reward.toLocaleString()}
              </span>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-400 text-sm mb-4 text-center">
              Find and purchase today's 3 combo cards in the Mine section
            </p>

            <div className="flex justify-center gap-4 mb-6">
              {[0, 1, 2].map((index) => {
                const isFound = dailyCombo.found.length > index;
                const card = isFound ? comboCards[dailyCombo.cards.indexOf(dailyCombo.found[index])] : null;
                
                return (
                  <div
                    key={index}
                    className={`w-24 h-24 rounded-xl flex items-center justify-center ${
                      isFound
                        ? 'bg-green-600/30 border-2 border-green-500'
                        : 'bg-[#272a2f] border-2 border-dashed border-gray-600'
                    }`}
                  >
                    {isFound ? (
                      <div className="text-center">
                        <span className="text-2xl">✓</span>
                        <p className="text-xs text-white mt-1">{card?.name}</p>
                      </div>
                    ) : (
                      <span className="text-4xl text-gray-600">?</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-[#272a2f] p-4 rounded-xl mb-4">
              <div className="flex items-center justify-center">
                <img src={dollarCoin} alt="Coin" className="w-6 h-6 mr-2" />
                <span className="text-white font-bold">
                  Reward: {dailyCombo.reward.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-xs text-center mb-4">
              Hint: Check the Mine section and buy the right combination of cards today!
            </p>

            <button
              onClick={onClose}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-colors"
            >
              Go to Mine
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyComboModal;
