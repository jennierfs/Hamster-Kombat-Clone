import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Exchange from './pages/Exchange';
import Mine from './pages/Mine';
import Friends from './pages/Friends';
import Earn from './pages/Earn';
import Airdrop from './pages/Airdrop';
import BottomNavigation from './components/BottomNavigation';
import TelegramProvider from './components/TelegramProvider';

function App() {
  return (
    <TelegramProvider>
      <Router>
        <div className="relative">
          <Routes>
            <Route path="/" element={<Exchange />} />
            <Route path="/mine" element={<Mine />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/earn" element={<Earn />} />
            <Route path="/airdrop" element={<Airdrop />} />
          </Routes>
          <BottomNavigation />
        </div>
      </Router>
    </TelegramProvider>
  );
}

export default App;
