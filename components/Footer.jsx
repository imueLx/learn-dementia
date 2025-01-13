// components/Footer.js
import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        {/* Logo and Copyright */}
        <h1 className="text-2xl font-bold mb-4">Dementia Awareness</h1>
        <p className="mb-6">
          &copy; 2025 Dementia Awareness. All Rights Reserved.
        </p>

        {/* Navigation Links */}
        <div className="mb-6 space-x-6">
          <Link href="/" className="hover:text-gray-400" aria-label="Home">
            Home
          </Link>
          <Link
            href="/takethetest"
            className="hover:text-gray-400"
            aria-label="Take the Test"
          >
            Take the Test
          </Link>
          <Link
            href="/learn"
            className="hover:text-gray-400"
            aria-label="Learn About Dementia"
          >
            Learn
          </Link>
          <Link
            href="/learn#symptoms"
            className="hover:text-gray-400"
            aria-label="Check Symptoms"
          >
            Symptoms
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-400"
            aria-label="Contact Us"
          >
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-400 hover:text-gray-200"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-400 hover:text-gray-200"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-400 hover:text-gray-200"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
