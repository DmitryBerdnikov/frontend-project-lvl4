import React, { createContext, useContext, useState } from 'react';

const authContext = createContext({});

export const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userLoggedIn = !!user?.token;

  const [loggedIn, setLoggedIn] = useState(userLoggedIn);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
