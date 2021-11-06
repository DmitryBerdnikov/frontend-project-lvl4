import React from 'react';
import {
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../../contexts/authContext.jsx';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
