import { useGameStore } from '../store/gameStore';
import TopBar from '../components/TopBar';
import { hamsterCoin } from '../images';

const Airdrop = () => {
  const { totalEarned, profitPerHour, levelIndex, referrals, upgrades } = useGameStore();

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toString();
  };

  // Calculate airdrop eligibility score
  const calculateAirdropScore = () => {
    let score = 0;
    
    // Points contribution (max 30 points)
    score += Math.min(30, Math.floor(totalEarned / 1000000) * 3);
    
    // Level contribution (max 20 points)
    score += levelIndex * 2;
    
    // Profit per hour contribution (max 25 points)
    score += Math.min(25, Math.floor(profitPerHour / 10000) * 5);
    
    // Referrals contribution (max 15 points)
    score += Math.min(15, referrals.length * 3);
    
    // Upgrades contribution (max 10 points)
    const totalUpgradeLevels = upgrades.reduce((sum, u) => sum + u.level, 0);
    score += Math.min(10, Math.floor(totalUpgradeLevels / 10));
    
    return Math.min(100, score);
  };

  const airdropScore = calculateAirdropScore();

  // Estimated tokens based on score
  const estimatedTokens = Math.floor(airdropScore * 1000);

  const stats = [
    { label: 'Total Earned', value: formatNumber(totalEarned), icon: '💰' },
    { label: 'Profit/Hour', value: formatNumber(profitPerHour), icon: '📈' },
    { label: 'Referrals', value: referrals.length.toString(), icon: '👥' },
    { label: 'Level', value: (levelIndex + 1).toString(), icon: '⭐' },
  ];

  const requirements = [
    { 
      title: 'Earn coins', 
      description: 'Earn at least 10M coins total', 
      progress: Math.min(100, (totalEarned / 10000000) * 100),
      completed: totalEarned >= 10000000 
    },
    { 
      title: 'Reach Gold level', 
      description: 'Upgrade your account to Gold', 
      progress: Math.min(100, ((levelIndex + 1) / 3) * 100),
      completed: levelIndex >= 2 
    },
    { 
      title: 'Invite friends', 
      description: 'Invite at least 3 friends', 
      progress: Math.min(100, (referrals.length / 3) * 100),
      completed: referrals.length >= 3 
    },
    { 
      title: 'Build profit', 
      description: 'Reach 5K profit per hour', 
      progress: Math.min(100, (profitPerHour / 5000) * 100),
      completed: profitPerHour >= 5000 
    },
  ];

  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <TopBar />

        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-1 left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px] overflow-y-auto pb-24">
            
            {/* Header */}
            <div className="px-4 pt-6 text-center">
              <img src={hamsterCoin} alt="Falco-X Coin" className="w-24 h-24 mx-auto mb-4" />
              <h1 className="text-2xl font-bold">Airdrop</h1>
              <p className="text-gray-400 mt-2">Get ready for the $FALCOX token airdrop!</p>
            </div>

            {/* Airdrop Score */}
            <div className="px-4 mt-6">
              <div className="bg-gradient-to-br from-yellow-600/30 to-orange-600/30 rounded-2xl p-6 border border-yellow-500/30">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Your Airdrop Score</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-5xl font-bold text-yellow-400">{airdropScore}</span>
                    <span className="text-2xl text-gray-400">/100</span>
                  </div>
                  
                  <div className="w-full h-3 bg-[#1d2025] rounded-full mt-4">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all"
                      style={{ width: `${airdropScore}%` }}
                    />
                  </div>

                  <div className="mt-4 p-3 bg-[#1d2025] rounded-xl">
                    <p className="text-gray-400 text-sm">Estimated Tokens</p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <img src={hamsterCoin} alt="FALCOX" className="w-6 h-6" />
                      <span className="text-2xl font-bold text-white">{formatNumber(estimatedTokens)} FALCOX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="px-4 mt-6">
              <h2 className="text-lg font-bold mb-3">Your Stats</h2>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-[#272a2f] rounded-xl p-4 text-center">
                    <span className="text-2xl">{stat.icon}</span>
                    <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                    <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="px-4 mt-6">
              <h2 className="text-lg font-bold mb-3">Airdrop Requirements</h2>
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div key={index} className={`bg-[#272a2f] rounded-xl p-4 ${req.completed ? 'border border-green-500/30' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          req.completed ? 'bg-green-500' : 'bg-[#1d2025]'
                        }`}>
                          {req.completed ? '✓' : index + 1}
                        </div>
                        <div>
                          <p className="text-white font-bold">{req.title}</p>
                          <p className="text-gray-400 text-sm">{req.description}</p>
                        </div>
                      </div>
                      <span className={`text-sm ${req.completed ? 'text-green-400' : 'text-gray-400'}`}>
                        {Math.floor(req.progress)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#1d2025] rounded-full">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          req.completed ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${req.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="px-4 mt-6 mb-4">
              <div className="bg-[#272a2f] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">ℹ️</span>
                  <div>
                    <p className="text-white font-bold">About the Airdrop</p>
                    <p className="text-gray-400 text-sm mt-1">
                      The $FALCOX token airdrop will be distributed to all eligible players based on their 
                      activity, level, and engagement. Keep playing, invite friends, and upgrade your 
                      exchange to maximize your airdrop allocation!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Contract */}
            <div className="px-4 mb-4">
              <div className="bg-[#272a2f] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📄</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-bold">Token Contract</p>
                    <p className="text-gray-400 text-xs mt-1 break-all font-mono">0xb957D98a9a57AfbBf7944f3616CdB4802eb2E646</p>
                    <a 
                      href="https://bscscan.com/token/0xb957D98a9a57AfbBf7944f3616CdB4802eb2E646" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-400 text-xs mt-2 inline-block hover:underline"
                    >
                      View on BscScan →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="px-4 mb-4">
              <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl p-4 border border-purple-500/30">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Airdrop Status</p>
                  <p className="text-xl font-bold text-white mt-2">🚀 Coming Soon</p>
                  <p className="text-gray-400 text-sm mt-2">Stay tuned for announcements!</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Airdrop;
