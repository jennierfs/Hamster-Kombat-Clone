import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { dollarCoin } from '../images';

interface DailyCipherModalProps {
  onClose: () => void;
}

const DailyCipherModal = ({ onClose }: DailyCipherModalProps) => {
  const { dailyCipher, solveDailyCipher } = useGameStore();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  if (!dailyCipher) return null;

  const handleSubmit = () => {
    if (solveDailyCipher(input)) {
      setTimeout(onClose, 500);
    } else {
      setError('Wrong answer! Try again.');
      setTimeout(() => setError(''), 2000);
    }
  };

  // Morse code representation hint
  const morseHint = dailyCipher.word.split('').map((_, index) => (
    <span key={index} className="mx-1">
      {'• '}
    </span>
  ));

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#1d2025] rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Daily Cipher</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
            ×
          </button>
        </div>

        {dailyCipher.solved ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-green-500 font-bold text-xl">Cipher Solved!</p>
            <p className="text-gray-400 mt-2">The word was: {dailyCipher.word}</p>
            <div className="flex items-center justify-center mt-4">
              <img src={dollarCoin} alt="Coin" className="w-8 h-8 mr-2" />
              <span className="text-white font-bold text-xl">
                +{dailyCipher.reward.toLocaleString()}
              </span>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-400 text-sm mb-4 text-center">
              Decode the Morse cipher to get the reward
            </p>

            <div className="bg-[#272a2f] p-4 rounded-xl mb-4">
              <p className="text-center text-2xl tracking-widest text-yellow-400">
                {dailyCipher.letters.map((_, i) => (input[i] || '_')).join(' ')}
              </p>
              <p className="text-center text-gray-500 mt-2 text-sm">
                {dailyCipher.word.length} letters
              </p>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-xs mb-2">Hint: Tap the falcon in morse code pattern</p>
              <div className="flex justify-center text-yellow-400 text-2xl">
                {morseHint}
              </div>
            </div>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              placeholder="Enter the word"
              maxLength={dailyCipher.word.length}
              className="w-full p-4 bg-[#272a2f] rounded-xl text-white text-center text-xl uppercase tracking-widest mb-4 outline-none focus:ring-2 focus:ring-yellow-500"
            />

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="flex items-center justify-center mb-4">
              <img src={dollarCoin} alt="Coin" className="w-6 h-6 mr-2" />
              <span className="text-white font-bold">
                Reward: {dailyCipher.reward.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={input.length !== dailyCipher.word.length}
              className={`w-full py-4 rounded-xl font-bold text-white transition-colors ${
                input.length === dailyCipher.word.length
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyCipherModal;
