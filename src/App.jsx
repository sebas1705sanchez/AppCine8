import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Details from './components/Details';
import Home from './components/Home';
import Filter from './pages/Filter';
import { StateContext } from './context/stateContext';

import './App.css';

function App() {
  return (
    <StateContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:type/:search" element={<Filter />} />
          <Route path="/:search/:ID" element={<Details />} />
        </Routes>
    </StateContext>
  );
}

export default App
