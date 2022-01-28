import axios from 'axios';
import React, { createContext, useState } from 'react';
import routes from '../routes';

const USER_KEY = 'user';

export const authContext = createContext({});

export const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem(USER_KEY));

  const userLoggedIn = !!user?.token;

  const [loggedIn, setLoggedIn] = useState(userLoggedIn);

  const logIn = async ({ username, password }) => {
    const response = await axios.post(routes.loginPath(), {
      username,
      password,
    });
    localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    setLoggedIn(true);
  };

  const signup = async ({ username, password }) => {
    const response = await axios.post(routes.signupPath(), {
      username,
      password,
    });
    localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem(USER_KEY);
    setLoggedIn(false);
  };

  return (
    <authContext.Provider
      value={{
        loggedIn,
        logIn,
        logOut,
        signup,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
