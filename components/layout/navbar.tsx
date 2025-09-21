"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/lib/useUser";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const links = [  
  {
    name: "Talents",
    href: "/talents",
  },
  {
    name: "Pricing",
    href: "/",
  },
  {
    name: "About us",
    href: "/about-us",
  }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, authenticated, loading } = useUser();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const userDisplayName = user?.nickname || user?.fullName || user?.email?.split('@')[0] || 'User';

  const navVariants = {
    top: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      className="py-4 px-6 fixed top-0 left-0 z-50 w-full"
      variants={navVariants}
      animate={scrolled ? "scrolled" : "top"}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)"
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="inline-block">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/logo/Spiveslogo coloured.svg"
              alt="Spives Logo"
              width={150}
              height={50}
              className="h-6 w-auto"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center text-sm gap-12">
          <div className="flex justify-between items-center gap-8">
            {links.map((link, index) => (
              <motion.div
                key={index}
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link 
                  href={link.href}
                  className="relative text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
                >
                  {link.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
          
          {!loading && (
            <AnimatePresence mode="wait">
              {authenticated ? (
                <div className="relative">
                  <motion.button
                    onClick={toggleUserMenu}
                    className="flex items-center gap-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {userDisplayName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span>{userDisplayName}</span>
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </motion.button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl py-2 z-50 border border-gray-100"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 font-medium"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            Profile
                          </Link>
                        </motion.div>
                        <motion.button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-red-600 font-medium"
                          whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.05)" }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          Sign out
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Link
                      href="/login"
                      className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl font-medium shadow-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Link
                      href="/register"
                      className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow duration-200"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          onClick={toggleMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.svg
                key="close"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="menu"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 z-40 bg-black/50"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={toggleMenu}
            />
            <motion.div
              className="md:hidden fixed top-20 left-4 right-4 z-50"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-100">
                <div className="flex flex-col space-y-4">
                  {links.map((link, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={link.href}
                        className="block bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 text-center py-4 px-6 rounded-xl font-medium transition-all duration-200"
                        onClick={toggleMenu}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {!loading && (
                    <>
                      {authenticated ? (
                        <>
                          <motion.div
                            custom={links.length}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <Link
                              href="/profile"
                              className="block bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 rounded-xl text-center font-medium shadow-lg"
                              onClick={toggleMenu}
                            >
                              Dashboard
                            </Link>
                          </motion.div>
                          <motion.div
                            custom={links.length + 1}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <button
                              onClick={handleSignOut}
                              className="w-full bg-red-50 hover:bg-red-100 text-red-600 px-6 py-4 rounded-xl font-medium transition-colors duration-200"
                            >
                              Sign out
                            </button>
                          </motion.div>
                        </>
                      ) : (
                        <>
                          <motion.div
                            custom={links.length}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <Link
                              href="/login"
                              className="block bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4 rounded-xl font-medium shadow-lg"
                              onClick={toggleMenu}
                            >
                              Login
                            </Link>
                          </motion.div>
                          <motion.div
                            custom={links.length + 1}
                            variants={menuItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <Link
                              href="/register"
                              className="block bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-4 rounded-xl font-medium shadow-lg"
                              onClick={toggleMenu}
                            >
                              Get Started
                            </Link>
                          </motion.div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;