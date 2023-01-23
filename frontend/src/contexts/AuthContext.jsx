import { useMemo, createContext, useState } from 'react';

import { logIn as logInApi } from '../api/user';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const tokenFromPersistentState = localStorage.getItem(AUTH_TOKEN_KEY);

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(tokenFromPersistentState),
  );

  const logIn = async ({ username, password }) => {
    try {
      const { token } = await logInApi({ username, password });

      localStorage.setItem(AUTH_TOKEN_KEY, token);
      setIsLoggedIn(true);

      return true;
    } catch (error) {
      console.error({ error });

      return false;
    }
  };

  const logOut = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsLoggedIn(false);
  };

  const value = useMemo(() => ({ isLoggedIn, logIn, logOut }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
