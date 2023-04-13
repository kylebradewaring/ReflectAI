import React from 'react';
import './Navbar.css';
import CompanyLogo from '../assets/abs-leaves_small.png';
import NavbarLogo from '../assets/reflectai-logo.png';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-info">
        <img className='navbar-logo' src={NavbarLogo} alt='ReflectAI Logo'/>
      </div>
      <div className="company-info">
        <img className="company-logo" src={CompanyLogo} alt="Aspirin Business Solutions Logo" />
        <span className="company-name">Aspirin Business Solutions</span>
      </div>
    </nav>
  );
};

export default Navbar;
