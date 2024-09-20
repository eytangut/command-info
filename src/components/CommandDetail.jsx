import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import commands from '../data/linux-commands.json';

// CommandDetail component
function CommandDetail() {
  const { name } = useParams();
  const [command, setCommand] = useState(null);
  const navigate = useNavigate();

  // Fetch command details
  useEffect(() => {
    const cmd = commands.find(c => c.name === name);
    if (cmd) {
      setCommand(cmd);
    } else {
      navigate('/command-info/');
    }
  }, [name, navigate]);

  if (!command) return null;

  // Handle back navigation
  const handleBack = () => {
    navigate('/command-info/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-500 p-4 font-mono">
      <motion.div 
        className="max-w-3xl mx-auto bg-black p-4 rounded-lg shadow-lg border border-green-500"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex space-x-2 mb-2">
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500"></motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500"></motion.div>
          <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500"></motion.div>
        </div>
        <motion.p 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-blue-400">user@linux-terminal</span>:<span className="text-purple-400">~/{command.name}</span>$ man {command.name}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            {command.name}
          </motion.h2>
          <motion.p 
            className="mb-4 text-sm text-gray-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            Category: {command.category}
          </motion.p>
          <motion.p 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            {command.longDescription}
          </motion.p>
          <motion.h3 
            className="text-xl font-semibold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            Usage:
          </motion.h3>
          <motion.p 
            className="mb-4 bg-gray-800 p-2 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
          >
            {command.usage}
          </motion.p>
          <motion.h3 
            className="text-xl font-semibold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.1 }}
          >
            Arguments:
          </motion.h3>
          <motion.ul 
            className="list-disc list-inside mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            {command.arguments.map((arg, index) => (
              <motion.li 
                key={index} 
                className="mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.3 + index * 0.1 }}
              >
                <span className="font-bold">{arg.name}</span>: {arg.description}
              </motion.li>
            ))}
          </motion.ul>
          <motion.h3 
            className="text-xl font-semibold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.4 }}
          >
            Examples:
          </motion.h3>
          <motion.ul 
            className="list-disc list-inside mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.5 }}
          >
            {command.examples.map((example, index) => (
              <motion.li 
                key={index} 
                className="mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
              >
                {example}
              </motion.li>
            ))}
          </motion.ul>
          <motion.button 
            onClick={handleBack} 
            className="mt-4 text-blue-400 hover:underline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.7 }}
          >
            cd ..
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CommandDetail;
