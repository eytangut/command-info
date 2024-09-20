import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Terminal from './components/Terminal';
import ButtonInterface from './components/ButtonInterface';
import CommandDetail from './components/CommandDetail';

// Main App component
function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-900 text-green-500">
        <Routes>
          <Route path="/command-info/" element={<Terminal />} />
          <Route path="/command-info/button-interface" element={<ButtonInterface />} />
          <Route path="/command-info/command/:name" element={<CommandDetail />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;