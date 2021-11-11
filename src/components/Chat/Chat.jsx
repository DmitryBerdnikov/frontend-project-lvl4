import React, { useEffect } from 'react';
import axios from 'axios';
import routes from '../../routes';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const Chat = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        console.log(response);
      } catch (err) {
        console.warn('can not fetch data for chat');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-5 h-100">
      <div className="row h-100 shadow bg-white rounded">
        <div className="col-4 col-md-2 bg-light border-end pt-5">
          Каналы
        </div>
        <div className="col">
          Hello
        </div>
      </div>
    </div>
  );
};

export default Chat;
