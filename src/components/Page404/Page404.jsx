import React from 'react';
import { useLocation } from 'react-router-dom';

export default () => {
  const location = useLocation();

  return (
    <div>
      <h1>
        No match for
        {location.pathname}
      </h1>
    </div>
  );
};
