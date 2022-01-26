import React, { createContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  addMessageAction,
  addChannel,
  removeChannel,
  setCurrentChannel,
  updateChannel,
} from '../slices/chat.js';

export const chatContext = createContext({});

export const ChatProvider = ({ children, socket }) => {
  const socketRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    socketRef.current = socket;

    socket.on('newMessage', (message) => {
      dispatch(addMessageAction(message));
    });

    socket.on('newChannel', (channelWithId) => {
      dispatch(addChannel(channelWithId));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel({ id }));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(updateChannel(channel));
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
          console.warn(
            'addNewChannel: Invalid response status ',
            response.status,
          );
          return;
        }

        onSuccess(response.data);
      });
    } catch (err) {
      if (typeof onError === 'function') {
        onError({ key: 'errors.app' });
        console.warn('addNewChannel:  response status', err);
      }
    }
  };

  const DRemoveChannel = ({ id }, { onSuccess, onError } = {}) => {
    try {
      socketRef.current.emit('removeChannel', { id }, (response) => {
        if (response.status !== 'ok') {
          if (typeof onError === 'function') {
            onError({ key: 'errors.server' });
          }
          console.warn(
            'removeChannel: Invalid response status ',
            response.status,
          );
          return;
        }

        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      });
    } catch (err) {
      if (typeof onError === 'function') {
        if (typeof onError === 'function') {
          onError({ key: 'errors.app' });
        }
        console.warn('removeChannel:  response status', err);
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

  const DSetCurrentChannel = ({ id }) => {
    dispatch(setCurrentChannel({ id }));
  };

  const renameChannel = ({ id, name }, { onSuccess, onError } = {}) => {
    try {
      socketRef.current.emit('renameChannel', { id, name }, (response) => {
        if (response.status !== 'ok') {
          if (typeof onError === 'function') {
            onError({ key: 'errors.server' });
          }
          console.warn(
            'renameChannel: Invalid response status ',
            response.status,
          );
          return;
        }

        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      });
    } catch (err) {
      if (typeof onError === 'function') {
        if (typeof onError === 'function') {
          onError({ key: 'errors.app' });
        }
        console.warn('renameChannel:  response status', err);
      }
    }
  };

  return (
    <chatContext.Provider
      value={{
        addNewChannel,
        addMessage,
        renameChannel,
        removeChannel: DRemoveChannel,
        setCurrentChannel: DSetCurrentChannel,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};
