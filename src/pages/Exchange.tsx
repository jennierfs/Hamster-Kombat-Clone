import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import TopBar from '../components/TopBar';
import PointsDisplay from '../components/PointsDisplay';
import EnergyBar from '../components/EnergyBar';
import DailyBonusCards from '../components/DailyBonusCards';
import DailyRewardModal from '../components/DailyRewardModal';
import DailyCipherModal from '../components/DailyCipherModal';
import DailyComboModal from '../components/DailyComboModal';

const Exchange = () => {
  const { 
    points, 
    energy, 
    maxEnergy, 
    pointsToAdd, 
    profitPerHour,
    tap, 
    updateEnergy, 
    collectPassiveIncome 
  } = useGameStore();

  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [showDailyCipher, setShowDailyCipher] = useState(false);
  const [showDailyCombo, setShowDailyCombo] = useState(false);

  // Update energy periodically
  useEffect(() => {
    const interval = setInterval(() => {
      updateEnergy();
    }, 1000);

    return () => clearInterval(interval);
  }, [updateEnergy]);

  // Collect passive income periodically
  useEffect(() => {
    collectPassiveIncome();
    
    const interval = setInterval(() => {
      collectPassiveIncome();
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [collectPassiveIncome]);

  // Passive income per second display
  useEffect(() => {
    if (profitPerHour <= 0) return;
    
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    if (pointsPerSecond <= 0) return;

    const interval = setInterval(() => {
      useGameStore.setState(state => ({
        points: state.points + pointsPerSecond,
        totalEarned: state.totalEarned + pointsPerSecond,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [profitPerHour]);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (energy <= 0) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;
    
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    tap(1);
    
    setClicks(prev => [...prev, { id: Date.now(), x: clientX, y: clientY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks(prev => prev.filter(click => click.id !== id));
  };

  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <TopBar />

        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-1 left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px] overflow-y-auto pb-24">
            
            <DailyBonusCards
              onOpenReward={() => setShowDailyReward(true)}
              onOpenCipher={() => setShowDailyCipher(true)}
              onOpenCombo={() => setShowDailyCombo(true)}
            />

            <div className="px-4 mt-4 flex justify-center">
              <PointsDisplay points={points} size="lg" />
            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div
                className="w-80 h-80 p-4 rounded-full circle-outer cursor-pointer select-none"
                onClick={handleCardClick}
                onTouchStart={handleCardClick}
              >
                <div className="w-full h-full rounded-full circle-inner">
                  <img
                    src="https://photos.pinksale.finance/file/pinksale-logo-upload/1770694538122-0df3b8b4e8a5cdaa2a70aba07bbc4c3e.png"
                    alt="Main Character"
                    className="w-full h-full pointer-events-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            <EnergyBar energy={energy} maxEnergy={maxEnergy} />
          </div>
        </div>
      </div>

      {/* Floating points animation */}
      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: 'float 1s ease-out',
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          +{pointsToAdd}
        </div>
      ))}

      {/* Modals */}
      {showDailyReward && <DailyRewardModal onClose={() => setShowDailyReward(false)} />}
      {showDailyCipher && <DailyCipherModal onClose={() => setShowDailyCipher(false)} />}
      {showDailyCombo && <DailyComboModal onClose={() => setShowDailyCombo(false)} />}
    </div>
  );
};

export default Exchange;
