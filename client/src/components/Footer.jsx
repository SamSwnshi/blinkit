import React from "react";
import logo from "../assets/logo.png";
import { FaInstagram, FaLinkedin, FaGithubAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t mt-10 ">
      <div className="container mx-auto p-2 flex flex-row items-center justify-between gap-4 text-center">
        {/* Logo Section */}
        <div className="h-full hover:scale-120 duration-200">
          <Link to="/" className="h-full flex items-center">
            <img src={logo} width={120} height={30} alt="logo" />
          </Link>
        </div>

        {/* Copyright Section */}
        <p className="text-sm">© All Rights Reserved 2025.</p>

        {/* Social Icons Section */}
        <div className="flex items-center gap-4 text-2xl">
          <a
            href="https://github.com/SamSwnshi"
            className="hover:text-green-800 hover:scale-110 duration-200"
          >
            <FaGithubAlt />
          </a>
          <a
            href="https://www.instagram.com/_sameer_suryawanshi_/"
            className="hover:text-green-800 hover:scale-110 duration-200"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/sameer-suryawanshi/"
            className="hover:text-green-800 hover:scale-110 duration-200"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
