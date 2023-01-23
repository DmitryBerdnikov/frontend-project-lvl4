import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const WithAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default WithAuth;
