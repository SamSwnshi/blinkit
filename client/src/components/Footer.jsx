import React from "react";

import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t mt-10 ">
      <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p>© All Rights Reserved 2025.</p>

        <div className="flex items-center gap-4 justify-center text-2xl">
          <a
            href="https://github.com/SamSwnshi"
            className="hover:text-green-800 hover:scale-120 duration-100"
          >
            <FaGithubAlt />
          </a>
          <a
            href="https://www.instagram.com/_sameer_suryawanshi_/"
            className="hover:text-green-800 hover:scale-120 duration-100"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/sameer-suryawanshi/"
            className="hover:text-green-800 hover:scale-120 duration-100"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
