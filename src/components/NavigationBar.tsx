'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaCalendarAlt } from 'react-icons/fa';

interface NavLink {
  id: string;
  title: string;
  path: string;
}

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks: NavLink[] = [
    { id: 'about', title: 'אודות', path: '#about' },
    { id: 'services', title: 'שירותים', path: '#services' },
    { id: 'booking', title: 'הזמנות', path: '#booking' },
    { id: 'faq', title: 'שאלות נפוצות', path: '#faq' },
    { id: 'contact', title: 'צור קשר', path: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.header
      className={`sticky top-0 w-full z-50 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      } transition-all duration-500 ease-in-out`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="/" className="text-3xl font-bold text-primary">
              asap
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav className="hidden md:flex items-center space-x-8 space-x-reverse" variants={itemVariants}>
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.path}
                className="text-gray-700 hover:text-secondary font-medium text-lg relative group"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.title}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                />
              </motion.a>
            ))}
            <motion.button
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center space-x-2 space-x-reverse"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0px 5px 15px rgba(212, 165, 165, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCalendarAlt className="ml-2" />
              <span>קבע תור עכשיו</span>
            </motion.button>
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden"
            variants={itemVariants}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-secondary focus:outline-none"
              aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-white z-50 pt-20 px-6"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col space-y-6 items-center">
              {navLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.path}
                  className="text-gray-700 hover:text-secondary font-medium text-xl py-2"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, color: '#4ECDC4' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMenu}
                >
                  {link.title}
                </motion.a>
              ))}
              <motion.button
                className="bg-primary text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 mt-6 flex items-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: '0px 5px 15px rgba(212, 165, 165, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
              >
                <FaCalendarAlt className="ml-2" />
                <span>קבע תור עכשיו</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavigationBar;