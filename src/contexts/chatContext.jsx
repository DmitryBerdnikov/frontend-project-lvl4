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

  const addNewChannel = (channel, { onSuccess, onError }) => {
    try {
      socketRef.current.emit('newChannel', channel, (response) => {
        if (response.status !== 'ok') {
          onError({ key: 'errors.server' });
          console.warn('addNewChannel: Invalid response status ', response.status);
          return;
        }

        onSuccess();
      });
    } catch (err) {
      if (typeof onError === 'function') {
        onError({ key: 'errors.app' });
        console.warn('addNewChannel:  response status', err);
      }
    }
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
