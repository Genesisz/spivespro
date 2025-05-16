"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const links = [
  {
    name: "Talents",
    href: "/",
  },
  {
    name: "Pricing",
    href: "/",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="py-2 container mx-auto px-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="inline-block">
          <div className="flex items-center">
            <Image
              src="/logo/Spiveslogo coloured.svg"
              alt="Spives Logo"
              width={150}
              height={50}
              className="h-5 w-auto"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center text-sm gap-12">
          <div className="flex justify-between items-center gap-12">
            {links.map((link, index) => (
              <Link key={index} href={link.href}>
                {link.name}
              </Link>
            ))}
          </div>
          <Link
            href="/login"
            className="bg-blue-950 text-white px-4 py-2 rounded-sm"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-orange-400 text-black px-4 py-2 rounded-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            ""
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Modal */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 bg-opacity-30 flex flex-col">
          <div className="bg-white p-4 mt-16 mx-4 rounded-md shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="" />
              <button
                onClick={toggleMenu}
                className="text-gray-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-3">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="bg-white text-center py-1 px-4"
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="bg-blue-950 text-white px-4 py-2 rounded-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-orange-400 text-black px-4 py-2 rounded-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
