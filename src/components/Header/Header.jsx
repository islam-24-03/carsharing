
import React, { useState } from "react";
import './Header.css'; // ✅ верно

const Header = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => setIsOpen(!isOpen);

   const scrollToSection = (id) => {
      const section = document.getElementById(id);
      if (section) {
         section.scrollIntoView({ behavior: "smooth" });
         setIsOpen(false);
      }
   };

   return (
      <header className="Header">
         <div className="logo">II Rental Auto</div>

         <nav className={`navigation ${isOpen ? "open" : ""}`}>
            <a onClick={() => scrollToSection("home")}>Home</a>
            <a onClick={() => scrollToSection("about")}>About</a>
            <a onClick={() => scrollToSection("services")}>Services</a>
            <a onClick={() => scrollToSection("booking")}>Book</a>
            <a onClick={() => scrollToSection("contact")}>Contact</a>
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
