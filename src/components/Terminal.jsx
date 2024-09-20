import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import commands from '../data/linux-commands.json';

// ButtonInterface component
function ButtonInterface() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['All', ...new Set(commands.map(cmd => cmd.category))];

  // Filter commands based on category and search term
  const filteredCommands = commands.filter(cmd => 
    (selectedCategory === 'All' || cmd.category === selectedCategory) &&
    (cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     cmd.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-900 text-green-500 p-4 font-mono">
      <motion.h1 
        className="text-3xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Linux Commands GUI
      </motion.h1>
      <motion.div 
        className="max-w-4xl mx-auto bg-black p-4 rounded-lg shadow-lg border border-green-500"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex space-x-2 mb-2">
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500"></motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500"></motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500"></motion.div>
        </div>
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search commands..."
            className="w-full p-2 bg-gray-800 text-green-500 border border-green-500 rounded mb-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <h2 className="text-xl font-semibold mb-2">Categories:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 rounded ${selectedCategory === category ? 'bg-green-500 text-black' : 'bg-gray-800 text-green-500'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence>
            {filteredCommands.map(cmd => (
              <motion.div
                key={cmd.name}
                className="bg-gray-800 p-4 rounded"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-2">{cmd.name}</h3>
                <p className="text-sm mb-2">{cmd.description}</p>
                <Link
                  to={`/command-info/command/${cmd.name}`}
                  className="text-blue-400 hover:underline"
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/command-info/" className="text-blue-400 hover:underline">
            Back to Terminal Interface
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ButtonInterface;