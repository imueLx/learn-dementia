"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItem = (href, label) => (
    <Link
      href={href}
      className="block text-lg px-4 py-2 hover:text-gray-300"
      aria-label={label}
      onClick={() => setIsOpen(false)} // Close menu when clicking a link
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-blue-600 text-white sticky top-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link href="/" aria-label="Dementia Test Home">
            Dementia 101
          </Link>
        </h1>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden text-white text-2xl focus:outline-none"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-6">
          {menuItem("/", "Home")}
          {menuItem("/assessment", "Assessment")}
          {menuItem("/learn", "Learn")}
          {menuItem("/contact", "Contact")}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={navRef}
          className="fixed top-0 right-0 h-full w-4/5 bg-blue-600 shadow-lg flex items-center justify-center z-50"
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
            onClick={() => setIsOpen(false)}
            aria-label="Close Menu"
          >
            <FaTimes />
          </button>
          <div className="flex flex-col space-y-6 text-center">
            {menuItem("/", "Home")}
            {menuItem("/assessment", "Assessment")}
            {menuItem("/learn", "Learn")}
            {menuItem("/contact", "Contact")}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
