import axios from 'axios';

export const logIn = async ({ username, password }) => {
  const { data } = await axios.post('/api/v1/login', { username, password });

  return { token: data.token, username: data.username };
};

export const signUp = async ({ username, password }) => {
  const { data } = await axios.post('/api/v1/signup', { username, password });

  return { token: data.token, username: data.username };
};
