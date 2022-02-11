import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/authContext.jsx';
import Header from './components/Header.jsx';
import Chat from './components/Chat/Chat.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Page404 from './components/Page404.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import routes from './routes';

export default ({ socket }) => (
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <div className="flex-grow-1">
        <Routes>
          <Route
            path={routes.homePage()}
            element={<PrivateRoute><Chat socket={socket} /></PrivateRoute>}
          />
          <Route path={routes.loginPage()} element={<Login />} />
          <Route path={routes.signupPage()} element={<Signup />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
      <ToastContainer />
    </AuthProvider>
  </BrowserRouter>
);
