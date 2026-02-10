import { NavLink } from 'react-router-dom';
import { binanceLogo, hamsterCoin } from '../images';
import Mine from '../icons/Mine';
import Friends from '../icons/Friends';
import Coins from '../icons/Coins';

const BottomNavigation = () => {
  const navItems = [
    { to: '/', icon: <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />, label: 'Exchange' },
    { to: '/mine', icon: <Mine className="w-8 h-8" />, label: 'Mine' },
    { to: '/friends', icon: <Friends className="w-8 h-8" />, label: 'Friends' },
    { to: '/earn', icon: <Coins className="w-8 h-8" />, label: 'Earn' },
    { to: '/airdrop', icon: <img src={hamsterCoin} alt="Airdrop" className="w-8 h-8" />, label: 'Airdrop' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `text-center w-1/5 p-2 m-1 rounded-2xl transition-all ${
              isActive
                ? 'bg-[#1c1f24] text-white'
                : 'text-[#85827d] hover:text-white'
            }`
          }
        >
          <div className="flex justify-center">{item.icon}</div>
          <p className="mt-1">{item.label}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNavigation;
