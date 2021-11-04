import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Page404 from '../Page404/Page404.jsx';

export default () => (
  <div className="App">
    <Routes>
      <Route path="*" element={<Page404 />} />
    </Routes>
  </div>
);
