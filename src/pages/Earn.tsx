import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import TopBar from '../components/TopBar';
import { dollarCoin } from '../images';
import { Task } from '../utils/types';

type TaskFilter = 'all' | 'daily' | 'social' | 'special' | 'onetime';

const Earn = () => {
  const { tasks, completeTask, claimTaskReward, levelIndex, profitPerHour, referrals } = useGameStore();
  const [activeFilter, setActiveFilter] = useState<TaskFilter>('all');

  const filters: { id: TaskFilter; name: string }[] = [
    { id: 'all', name: 'All' },
    { id: 'daily', name: 'Daily' },
    { id: 'social', name: 'Social' },
    { id: 'special', name: 'Special' },
    { id: 'onetime', name: 'Achievements' },
  ];

  const filteredTasks = activeFilter === 'all' 
    ? tasks 
    : tasks.filter(t => t.type === activeFilter);

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toString();
  };

  const getTaskIcon = (icon: string) => {
    switch (icon) {
      case 'calendar': return '📅';
      case 'tap': return '👆';
      case 'coin': return '💰';
      case 'telegram': return '✈️';
      case 'twitter': return '🐦';
      case 'discord': return '💬';
      case 'youtube': return '▶️';
      case 'instagram': return '📷';
      case 'friends': return '👥';
      case 'level': return '⭐';
      case 'upgrade': return '⬆️';
      case 'profit': return '📈';
      default: return '🎯';
    }
  };

  const checkTaskCompletion = (task: Task): boolean => {
    // Auto-check certain tasks
    switch (task.id) {
      case 'reach-silver':
        return levelIndex >= 1;
      case 'reach-gold':
        return levelIndex >= 2;
      case 'reach-platinum':
        return levelIndex >= 3;
      case 'reach-diamond':
        return levelIndex >= 4;
      case 'invite-3-friends':
        return referrals.length >= 3;
      case 'invite-10-friends':
        return referrals.length >= 10;
      case 'profit-1k':
        return profitPerHour >= 1000;
      case 'profit-10k':
        return profitPerHour >= 10000;
      case 'profit-100k':
        return profitPerHour >= 100000;
      default:
        return task.completed;
    }
  };

  const handleTaskClick = (task: Task) => {
    if (task.claimed) return;

    const isComplete = checkTaskCompletion(task);
    
    if (isComplete && !task.completed) {
      completeTask(task.id);
    }

    if (task.completed || isComplete) {
      claimTaskReward(task.id);
    } else if (task.link) {
      window.open(task.link, '_blank');
      // Mark as completed after clicking the link
      setTimeout(() => {
        completeTask(task.id);
      }, 2000);
    }
  };

  const totalRewards = tasks.reduce((sum, t) => sum + t.reward, 0);
  const claimedRewards = tasks.filter(t => t.claimed).reduce((sum, t) => sum + t.reward, 0);

  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <TopBar />

        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-1 left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px] overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="px-4 pt-6 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h1 className="text-2xl font-bold">Earn More Coins</h1>
              <p className="text-gray-400 mt-2">Complete tasks to earn rewards</p>
            </div>

            {/* Progress */}
            <div className="px-4 mt-4">
              <div className="bg-[#272a2f] rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">
                    {tasks.filter(t => t.claimed).length}/{tasks.length} completed
                  </span>
                </div>
                <div className="w-full h-2 bg-[#1d2025] rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all"
                    style={{ width: `${(claimedRewards / totalRewards) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <img src={dollarCoin} alt="Coin" className="w-5 h-5" />
                  <span className="text-white">{formatNumber(claimedRewards)} / {formatNumber(totalRewards)}</span>
                </div>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex px-2 mt-4 gap-1 overflow-x-auto scrollbar-hide">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-[#f3ba2f] text-black'
                      : 'bg-[#272a2f] text-white hover:bg-[#323539]'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>

            {/* Tasks list */}
            <div className="flex-1 overflow-y-auto p-4 pb-24">
              <div className="space-y-3">
                {filteredTasks.map(task => {
                  const isComplete = checkTaskCompletion(task);
                  const canClaim = (isComplete || task.completed) && !task.claimed;

                  return (
                    <button
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                      disabled={task.claimed}
                      className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${
                        task.claimed
                          ? 'bg-green-600/20 border border-green-500/30'
                          : canClaim
                          ? 'bg-yellow-600/20 border border-yellow-500/50 hover:bg-yellow-600/30'
                          : 'bg-[#272a2f] hover:bg-[#323539]'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        task.claimed ? 'bg-green-600/30' : 'bg-[#1d2025]'
                      }`}>
                        {task.claimed ? '✓' : getTaskIcon(task.icon)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold truncate ${task.claimed ? 'text-green-400' : 'text-white'}`}>
                          {task.title}
                        </p>
                        <p className="text-gray-400 text-sm truncate">{task.description}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <img src={dollarCoin} alt="Coin" className="w-4 h-4" />
                          <span className="text-yellow-400 font-bold text-sm">
                            +{formatNumber(task.reward)}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        {task.claimed ? (
                          <span className="text-green-400 text-sm">Claimed</span>
                        ) : canClaim ? (
                          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-lg text-sm font-bold">
                            Claim
                          </span>
                        ) : task.link ? (
                          <span className="text-gray-400 text-sm">Go →</span>
                        ) : (
                          <span className="text-gray-500 text-sm">In progress</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earn;
