import React from 'react';
import { motion } from 'framer-motion';

function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === 'mocha' ? 'latte' : 'mocha');
  };

  return (
    <motion.button
      className="fixed top-4 right-4 z-10 p-2 rounded-full bg-ctp-surface0 text-ctp-text"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === 'mocha' ? '☀️' : '🌙'}
    </motion.button>
  );
}

export default ThemeToggle;