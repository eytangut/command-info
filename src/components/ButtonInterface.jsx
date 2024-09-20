
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import commands from '../data/linux-commands.json';

// Terminal component
function ButtonInterface() {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('Welcome to the Linux Command Terminal. Type "help" for available commands.');
  const navigate = useNavigate();
  const terminalRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Handle terminal command submission
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const input = terminalInput.trim().toLowerCase();
    let output = '';

    // Command processing
    switch (input) {
      case 'ls':
      case 'ls commands':
        output = commands.map(cmd => cmd.name).join('\n');
        break;
      case 'clear':
        setTerminalOutput('');
        setTerminalInput('');
        return;
      case 'help':
        output = 'Available commands:\n' +
                 'ls or ls commands - List all commands\n' +
                 'man <command> - Show details for a specific command\n' +
                 'clear - Clear the terminal\n' +
                 'gui - Switch to button-based interface\n' +
                 'echo <message> - Display a message\n' +
                 'date - Display current date and time\n' +
                 'whoami - Display current user\n' +
                 'pwd - Print working directory\n' +
                 'help - Show this help message';
        break;
      case 'gui':
        navigate('/command-info/button-interface');
        return;
      case 'date':
        output = new Date().toString();
        break;
      case 'whoami':
        output = 'user@linux-terminal';
        break;
      case 'pwd':
        output = '/home/user';
        break;
      default:
        if (input.startsWith('man ')) {
          const cmdName = input.split(' ')[1];
          const cmd = commands.find(c => c.name === cmdName);
          if (cmd) {
            navigate(`/command-info/command/${cmdName}`);
            return;
          } else {
            output = `No manual entry for ${cmdName}`;
          }
        } else if (input.startsWith('echo ')) {
          output = input.slice(5);
        } else if (input.startsWith('search ')) {
          const searchTerm = input.split(' ').slice(1).join(' ');
          const results = commands.filter(cmd => 
            cmd.name.includes(searchTerm) || 
            cmd.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
          output = results.length > 0 
            ? results.map(cmd => `${cmd.name} - ${cmd.description}`).join('\n')
            : 'No commands found matching your search.';
        } else {
          output = `Command not found: ${input}`;
        }
    }

    setTerminalOutput(prevOutput => `${prevOutput}\n\n$ ${input}\n${output}`);
    setTerminalInput('');
  };

  return (
    <div className="min-h-full bg-gray-900 text-green-500 p-4 font-mono">
      <motion.h1 
        className="text-3xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Linux Command Terminal
      </motion.h1>
      <motion.div 
        className="max-w-xl mx-auto bg-black p-4 rounded-lg shadow-lg border border-green-500"
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
          ref={terminalRef}
          className="h-96 overflow-auto mb-2 p-2 bg-gray-800 rounded custom-scrollbar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <pre className="whitespace-pre-wrap">{terminalOutput}</pre>
        </motion.div>
        <form onSubmit={handleTerminalSubmit} className="mt-2">
          <motion.input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            className="w-full p-2 bg-gray-800 text-green-500 border border-green-500 rounded"
            placeholder="Type a command (e.g., ls, man <command>, help)"
            autoFocus
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </form>
      </motion.div>
    </div>
  );
}

export default ButtonInterface;