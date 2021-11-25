/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const initialState = {
  channels: [],
  currentChannelId: null,
  messages: [],
};

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

export const fetchDataAction = createAsyncThunk('data/fetch', async () => {
  const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
  return response.data;
});

const rootSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    changeCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: {
    [fetchDataAction.fulfilled]: (state, { payload }) => {
      state.channels = payload.channels;
      state.messages = payload.messages;
      state.currentChannelId = payload.currentChannelId;
    },
  },
});

const { actions, reducer } = rootSlice;

export const { addMessage, changeCurrentChannelId } = actions;

export default reducer;
