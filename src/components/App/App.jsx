import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from '../Chat/Chat.jsx';
import Login from '../Login/Login.jsx';
import Page404 from '../Page404/Page404.jsx';

export default () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </div>
);
