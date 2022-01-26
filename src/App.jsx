import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/authContext.jsx';
import Header from './components/Header/Header.jsx';
import Chat from './components/Chat/Chat.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Page404 from './components/Page404/Page404.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

export default ({ socket }) => (
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<PrivateRoute><Chat socket={socket} /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
      <ToastContainer />
    </AuthProvider>
  </BrowserRouter>
);
