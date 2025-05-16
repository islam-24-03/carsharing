import React, { useState } from "react";
import logo from "../Header/img/logo.png";
import "./style.css";

const Header = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => setIsOpen(!isOpen);

   return (
      <header className="Header">
         <div className="logo">
            <img src={logo} alt="II Rental Auto Logo" />
         </div>

         <nav className={`navigation ${isOpen ? "open" : ""}`}>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
         </nav>

         <div className="burger" onClick={toggleMenu}>
            <div className="line" />
            <div className="line" />
            <div className="line" />
         </div>
      </header>
   );
};

export default Header;
