import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../../contexts/authContext.jsx';
import Header from '../Header/Header.jsx';
import Chat from '../Chat/Chat.jsx';
import Login from '../Login/Login.jsx';
import Signup from '../Signup/Signup.jsx';
import Page404 from '../Page404/Page404.jsx';
import RequireAuth from '../RequireAuth/RequireAuth.jsx';

export default () => (
  <AuthProvider>
    <Header />
    <div className="flex-grow-1">
      <Routes>
        <Route path="/" element={<RequireAuth><Chat /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
    <ToastContainer />
  </AuthProvider>
);
