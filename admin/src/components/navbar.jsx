import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const location = useLocation(); // Get the current location
  const [activeTab, setActiveTab] = useState(location.pathname); // Set the active tab based on URL

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Update active tab on click
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="hamburger-menu">
          <Menu size={24} />
        </button>

        <div className="nav-items">
          <Link
            to="/manage"
            className={`nav-item ${activeTab === '/manage' ? 'active' : ''}`}
            onClick={() => handleTabClick('/manage')}
          >
            Manage Item
          </Link>
          <Link
            to="/requests"
            className={`nav-item ${activeTab === '/requests' ? 'active' : ''}`}
            onClick={() => handleTabClick('/requests')}
          >
            Requests
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
