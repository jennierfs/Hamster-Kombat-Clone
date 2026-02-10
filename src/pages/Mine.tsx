import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import TopBar from '../components/TopBar';
import PointsDisplay from '../components/PointsDisplay';
import { dollarCoin } from '../images';

type Category = 'markets' | 'pr' | 'team' | 'legal' | 'specials';

const Mine = () => {
  const { points, upgrades, purchaseUpgrade, dailyCombo, selectComboCard } = useGameStore();
  const [activeCategory, setActiveCategory] = useState<Category>('markets');
  const [selectedUpgrade, setSelectedUpgrade] = useState<string | null>(null);

  const categories: { id: Category; name: string }[] = [
    { id: 'markets', name: 'Markets' },
    { id: 'pr', name: 'PR&Team' },
    { id: 'legal', name: 'Legal' },
    { id: 'specials', name: 'Specials' },
  ];

  const filteredUpgrades = upgrades.filter(u => u.category === activeCategory);

  const calculatePrice = (basePrice: number, level: number) => {
    return Math.floor(basePrice * Math.pow(1.5, level));
  };

  const calculateProfit = (baseProfitPerHour: number, level: number) => {
    return Math.floor(baseProfitPerHour * Math.pow(1.2, level));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toString();
  };

  const handlePurchase = (upgradeId: string) => {
    const success = purchaseUpgrade(upgradeId);
    if (success) {
      // Check if this card is part of daily combo
      if (dailyCombo && dailyCombo.cards.includes(upgradeId) && !dailyCombo.found.includes(upgradeId)) {
        selectComboCard(upgradeId);
      }
      setSelectedUpgrade(null);
    }
  };

  const canAfford = (upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade) return false;
    const price = calculatePrice(upgrade.basePrice, upgrade.level);
    return points >= price && upgrade.level < upgrade.maxLevel;
  };

  const isLocked = (upgrade: typeof upgrades[0]) => {
    if (!upgrade.requiredCardId) return false;
    const requiredCard = upgrades.find(u => u.id === upgrade.requiredCardId);
    return !requiredCard || requiredCard.level < (upgrade.requiredCardLevel || 1);
  };

  const selected = upgrades.find(u => u.id === selectedUpgrade);

  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <TopBar />

        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-1 left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px] overflow-hidden flex flex-col">
            
            {/* Points display */}
            <div className="px-4 pt-4 pb-2">
              <PointsDisplay points={points} size="md" />
            </div>

            {/* Category tabs */}
            <div className="flex px-2 gap-1 overflow-x-auto scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-[#f3ba2f] text-black'
                      : 'bg-[#272a2f] text-white hover:bg-[#323539]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Daily Combo hint */}
            {dailyCombo && !dailyCombo.solved && (
              <div className="mx-4 mt-2 p-2 bg-yellow-600/20 border border-yellow-500/50 rounded-lg">
                <p className="text-xs text-yellow-400 text-center">
                  🎯 Daily Combo: {dailyCombo.found.length}/3 cards found
                </p>
              </div>
            )}

            {/* Upgrades grid */}
            <div className="flex-1 overflow-y-auto p-4 pb-24">
              <div className="grid grid-cols-2 gap-3">
                {filteredUpgrades.map(upgrade => {
                  const price = calculatePrice(upgrade.basePrice, upgrade.level);
                  const profit = calculateProfit(upgrade.baseProfitPerHour, upgrade.level);
                  const locked = isLocked(upgrade);
                  const isComboCard = dailyCombo?.cards.includes(upgrade.id) && !dailyCombo?.found.includes(upgrade.id);

                  return (
                    <button
                      key={upgrade.id}
                      onClick={() => !locked && setSelectedUpgrade(upgrade.id)}
                      disabled={locked}
                      className={`p-3 rounded-xl text-left transition-all ${
                        locked
                          ? 'bg-[#272a2f]/50 opacity-50 cursor-not-allowed'
                          : isComboCard
                          ? 'bg-[#272a2f] border-2 border-yellow-500 hover:bg-[#323539]'
                          : 'bg-[#272a2f] hover:bg-[#323539]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-[#1d2025] rounded-lg flex items-center justify-center text-xl">
                          {upgrade.image === 'fan-tokens' && '🏆'}
                          {upgrade.image === 'staking' && '📈'}
                          {upgrade.image === 'btc-pairs' && '₿'}
                          {upgrade.image === 'eth-pairs' && 'Ξ'}
                          {upgrade.image === 'top-10' && '🔟'}
                          {upgrade.image === 'meme-coins' && '🐕'}
                          {upgrade.image === 'gamefi' && '🎮'}
                          {upgrade.image === 'defi' && '💎'}
                          {upgrade.image === 'ceo' && '👔'}
                          {upgrade.image === 'marketing' && '📢'}
                          {upgrade.image === 'it-team' && '💻'}
                          {upgrade.image === 'support' && '🎧'}
                          {upgrade.image === 'security' && '🔒'}
                          {upgrade.image === 'ux-team' && '🎨'}
                          {upgrade.image === 'kyc' && '🪪'}
                          {upgrade.image === 'aml' && '⚖️'}
                          {upgrade.image === 'us-license' && '🇺🇸'}
                          {upgrade.image === 'eu-license' && '🇪🇺'}
                          {upgrade.image === 'asia-license' && '🌏'}
                          {upgrade.image === 'nft' && '🖼️'}
                          {upgrade.image === 'vip' && '⭐'}
                          {upgrade.image === 'launchpad' && '🚀'}
                          {upgrade.image === 'mobile-app' && '📱'}
                          {upgrade.image === 'trading-bot' && '🤖'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate">{upgrade.name}</p>
                          <p className="text-xs text-gray-400">Lvl {upgrade.level}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1 text-green-400">
                          <span>+{formatNumber(profit)}/h</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <img src={dollarCoin} alt="Coin" className="w-4 h-4" />
                          <span className={points >= price ? 'text-white' : 'text-red-400'}>
                            {formatNumber(price)}
                          </span>
                        </div>
                      </div>

                      {locked && (
                        <p className="text-xs text-red-400 mt-1">
                          🔒 Requires {upgrades.find(u => u.id === upgrade.requiredCardId)?.name} Lvl {upgrade.requiredCardLevel}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-end justify-center z-[100]">
          <div className="bg-[#1d2025] rounded-t-3xl w-full max-w-xl p-6 animate-slide-up">
            <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-4" />
            
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-[#272a2f] rounded-2xl mx-auto flex items-center justify-center text-4xl mb-3">
                {selected.image === 'fan-tokens' && '🏆'}
                {selected.image === 'staking' && '📈'}
                {selected.image === 'btc-pairs' && '₿'}
                {selected.image === 'eth-pairs' && 'Ξ'}
                {selected.image === 'top-10' && '🔟'}
                {selected.image === 'meme-coins' && '🐕'}
                {selected.image === 'gamefi' && '🎮'}
                {selected.image === 'defi' && '💎'}
                {selected.image === 'ceo' && '👔'}
                {selected.image === 'marketing' && '📢'}
                {selected.image === 'it-team' && '💻'}
                {selected.image === 'support' && '🎧'}
                {selected.image === 'security' && '🔒'}
                {selected.image === 'ux-team' && '🎨'}
                {selected.image === 'kyc' && '🪪'}
                {selected.image === 'aml' && '⚖️'}
                {selected.image === 'us-license' && '🇺🇸'}
                {selected.image === 'eu-license' && '🇪🇺'}
                {selected.image === 'asia-license' && '🌏'}
                {selected.image === 'nft' && '🖼️'}
                {selected.image === 'vip' && '⭐'}
                {selected.image === 'launchpad' && '🚀'}
                {selected.image === 'mobile-app' && '📱'}
                {selected.image === 'trading-bot' && '🤖'}
              </div>
              <h3 className="text-xl font-bold text-white">{selected.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{selected.description}</p>
              <p className="text-gray-500 text-xs mt-2">Level {selected.level} → {selected.level + 1}</p>
            </div>

            <div className="bg-[#272a2f] rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Profit per hour</span>
                <span className="text-green-400 font-bold">
                  +{formatNumber(calculateProfit(selected.baseProfitPerHour, selected.level))}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedUpgrade(null)}
                className="flex-1 py-4 bg-[#272a2f] rounded-xl font-bold text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePurchase(selected.id)}
                disabled={!canAfford(selected.id)}
                className={`flex-1 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 ${
                  canAfford(selected.id)
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                <img src={dollarCoin} alt="Coin" className="w-5 h-5" />
                {formatNumber(calculatePrice(selected.basePrice, selected.level))}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mine;
