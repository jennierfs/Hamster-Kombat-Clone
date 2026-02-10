import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import TopBar from '../components/TopBar';
import { dollarCoin } from '../images';

const Friends = () => {
  const { referrals, referralCode, referralBonus } = useGameStore();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://t.me/FXUniversebot?start=${referralCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Falco-X!',
        text: `Join me in Falco-X and get ${referralBonus.toLocaleString()} coins bonus!`,
        url: referralLink,
      });
    } else {
      handleCopyLink();
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toString();
  };

  const totalEarnedFromReferrals = referrals.length * referralBonus;

  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <TopBar />

        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-1 left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px] overflow-y-auto pb-24">
            
            {/* Header */}
            <div className="px-4 pt-6 text-center">
              <div className="text-6xl mb-4">👥</div>
              <h1 className="text-2xl font-bold">Invite Friends!</h1>
              <p className="text-gray-400 mt-2">You and your friend will receive bonuses</p>
            </div>

            {/* Bonus info */}
            <div className="px-4 mt-6">
              <div className="bg-[#272a2f] rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1d2025] rounded-xl flex items-center justify-center">
                    🎁
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold">Invite a friend</p>
                    <div className="flex items-center gap-1 mt-1">
                      <img src={dollarCoin} alt="Coin" className="w-5 h-5" />
                      <span className="text-yellow-400 font-bold">+{formatNumber(referralBonus)}</span>
                      <span className="text-gray-400 text-sm">for you and your friend</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#272a2f] rounded-xl p-4 mt-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1d2025] rounded-xl flex items-center justify-center">
                    ⭐
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold">Invite a friend with Telegram Premium</p>
                    <div className="flex items-center gap-1 mt-1">
                      <img src={dollarCoin} alt="Coin" className="w-5 h-5" />
                      <span className="text-yellow-400 font-bold">+{formatNumber(referralBonus * 5)}</span>
                      <span className="text-gray-400 text-sm">for you and your friend</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="px-4 mt-6">
              <div className="flex gap-3">
                <div className="flex-1 bg-[#272a2f] rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm">Friends</p>
                  <p className="text-2xl font-bold text-white mt-1">{referrals.length}</p>
                </div>
                <div className="flex-1 bg-[#272a2f] rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm">Total Earned</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <img src={dollarCoin} alt="Coin" className="w-6 h-6" />
                    <p className="text-2xl font-bold text-white">{formatNumber(totalEarnedFromReferrals)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Friends list */}
            <div className="px-4 mt-6">
              <h2 className="text-lg font-bold mb-3">List of your friends ({referrals.length})</h2>
              
              {referrals.length === 0 ? (
                <div className="bg-[#272a2f] rounded-xl p-8 text-center">
                  <p className="text-6xl mb-4">😢</p>
                  <p className="text-gray-400">You haven't invited anyone yet</p>
                  <p className="text-gray-500 text-sm mt-2">Invite friends and earn bonuses together!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {referrals.map((referral) => (
                    <div key={referral.id} className="bg-[#272a2f] rounded-xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {referral.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-bold">{referral.name}</p>
                        <p className="text-gray-400 text-sm">
                          {new Date(referral.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src={dollarCoin} alt="Coin" className="w-5 h-5" />
                        <span className="text-yellow-400 font-bold">+{formatNumber(referralBonus)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Referral link */}
            <div className="px-4 mt-6 mb-4">
              <div className="bg-[#272a2f] rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-2">Your referral link</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 bg-[#1d2025] rounded-lg px-3 py-2 text-sm text-gray-300 outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                      copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-[#1d2025] text-white hover:bg-[#323539]'
                    }`}
                  >
                    {copied ? '✓' : '📋'}
                  </button>
                </div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="px-4 pb-4">
              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex-1 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold text-white flex items-center justify-center gap-2"
                >
                  <span>Invite a friend</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-14 py-4 bg-[#272a2f] rounded-xl font-bold text-white flex items-center justify-center"
                >
                  📋
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
