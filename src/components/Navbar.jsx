import { Search, Bell, User, Sun, Moon, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLightMode]);

  return (
    <header className="navbar glass-panel">
      <div className="search-bar">
        <Search className="search-icon" size={20} />
        <input type="text" placeholder="Search devices, alerts, or tags..." />
      </div>
      <div className="nav-actions">
        <button 
          className="icon-btn" 
          onClick={() => setIsLightMode(!isLightMode)}
          aria-label="Toggle Theme"
        >
          {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <Link to="/alerts" className="icon-btn with-badge">
          <Bell size={20} />
          <span className="badge">3</span>
        </Link>
        <Link to="/help" className="icon-btn">
          <HelpCircle size={20} />
        </Link>
        <div className="user-profile">
          <Link to="/profile" className="avatar">
            <User size={20} />
          </Link>
          <div className="user-info">
            <span className="user-name">Alex Rivera</span>
            <span className="user-role text-[#22D3EE] font-bold">SECURITY LEAD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
