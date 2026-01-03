import React from "react";
import Logo from "../Logo/Logo";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base-content">
          {/* Brand */}
          <div className="space-y-3">
            <Logo />
            <p className="text-sm opacity-80">
              HomeHero connects you with trusted professionals for plumbing,
              electrical work, cleaning, painting, and more — all at your
              doorstep.
            </p>
            <p className="text-xs opacity-60">
              © {new Date().getFullYear()} HomeHero. All rights reserved.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-3">Popular Services</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Plumbing Services</li>
              <li>Electrician</li>
              <li>Home Cleaning</li>
              <li>Painting & Renovation</li>
              <li>Gardening</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a className="p-2 rounded-full bg-base-300 hover:bg-primary hover:text-white transition">
                <Facebook size={18} />
              </a>
              <a className="p-2 rounded-full bg-base-300 hover:bg-primary hover:text-white transition">
                <Instagram size={18} />
              </a>
              <a className="p-2 rounded-full bg-base-300 hover:bg-primary hover:text-white transition">
                <Twitter size={18} />
              </a>
              <a className="p-2 rounded-full bg-base-300 hover:bg-primary hover:text-white transition">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
