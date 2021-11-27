import io from 'socket.io-client';
import React, { createContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  addMessageAction,
  addChannel,
} from '../slices/index.js';

export const chatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const socketRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io();
    socketRef.current = socket;

    socket.on('newMessage', (message) => {
      dispatch(addMessageAction(message));
    });

    socket.on('newChannel', (channelWithId) => {
      dispatch(addChannel(channelWithId));
    });

    return () => {
      socket.close();
    };
  }, []);

  const addNewChannel = (channel) => {
    socketRef.current.emit('newChannel', channel, (response) => {
      if (response.status === 'ok') {
        console.log('new channel added');
      }
    });
  };

  const addMessage = (message, { onSuccess }) => {
    socketRef.current.emit('newMessage', message, (response) => {
      if (response.status === 'ok') {
        if (typeof onSuccess === 'function') {
          onSuccess();
          console.log('new message added');
        }
      }
    });
  };

  return (
    <chatContext.Provider value={{ addNewChannel, addMessage }}>
      {children}
    </chatContext.Provider>
  );
};
