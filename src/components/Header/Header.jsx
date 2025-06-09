import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // импорт Link
import './Header.css';

const Header = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 10);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const toggleMenu = () => setIsOpen(!isOpen);

   const scrollToSection = (id) => {
      const section = document.getElementById(id);
      if (section) {
         section.scrollIntoView({ behavior: "smooth" });
         setIsOpen(false);
      }
   };

   return (
      <header className={`Header ${scrolled ? "scrolled" : ""}`}>
         <div className="logo">
            <span className="logo-highlight">II</span> Rental Auto
         </div>

         <nav className={`navigation ${isOpen ? "open" : ""}`}>
            <div className="nav-links">
               <a onClick={() => scrollToSection("home")} className="nav-link">Home</a>
               <a onClick={() => scrollToSection("about")} className="nav-link">About</a>
               <a onClick={() => scrollToSection("services")} className="nav-link">Services</a>
               <a onClick={() => scrollToSection("booking")} className="nav-link">Book Now</a>

               {/* Используем Link для перехода на /account */}
               <Link
                  to="/account"
                  className="nav-link contact-link"
                  onClick={() => setIsOpen(false)}
               >
                  Account
               </Link>
            </div>
         </nav>

         <div className={`burger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
            <div className="line line1" />
            <div className="line line2" />
            <div className="line line3" />
         </div>
      </header>
   );
};

export default Header;
