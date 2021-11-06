import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../contexts/authContext.jsx';
import Header from '../Header/Header.jsx';
import Chat from '../Chat/Chat.jsx';
import Login from '../Login/Login.jsx';
import Page404 from '../Page404/Page404.jsx';

export default () => (
  <AuthProvider>
    <Header />
    <div className="flex-grow-1">
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  </AuthProvider>
);
