import React from 'react'
import Layout from './layout'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { NotFound, Auth } from './pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App
