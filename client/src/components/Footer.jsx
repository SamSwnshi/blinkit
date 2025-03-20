import React from "react";

import { FaInstagram, FaLinkedin, FaGithubAlt } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="border-t mt-10 flex justify-center items-center">
      <div className="container mx-auto p-2 flex flex-row items-center justify-between gap-4 text-center">
       

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
