import { useGameStore } from '../store/gameStore';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const { vibrationEnabled, soundEnabled, toggleVibration, toggleSound, resetGame } = useGameStore();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      resetGame();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#1d2025] rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#272a2f] rounded-xl">
            <span className="text-white">Vibration</span>
            <button
              onClick={toggleVibration}
              className={`w-12 h-6 rounded-full transition-colors ${
                vibrationEnabled ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform mx-0.5 ${
                  vibrationEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#272a2f] rounded-xl">
            <span className="text-white">Sound</span>
            <button
              onClick={toggleSound}
              className={`w-12 h-6 rounded-full transition-colors ${
                soundEnabled ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform mx-0.5 ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <button
              onClick={handleReset}
              className="w-full p-4 bg-red-600/20 text-red-500 rounded-xl hover:bg-red-600/30 transition-colors"
            >
              Reset Progress
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Falco-X v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
