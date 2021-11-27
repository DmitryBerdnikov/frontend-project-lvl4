import React, { createContext, useState } from 'react';
import ModalAddNewChannel from '../components/ModalAddNewChannel/ModalAddNewChannel.jsx';

const Modal = ({ type, onSubmit, onHide }) => {
  if (!type) {
    return null;
  }

  const Component = ModalAddNewChannel;
  return <Component isVisible onSubmit={onSubmit} onHide={onHide} />;
};

export const modalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);
  const hideModal = () => {
    setModalType(null);
    console.log('hideModal');
  };

  const showModal = (type) => {
    setModalType(type);
  };

  return (
    <modalContext.Provider value={{ showModal }}>
      {children}
      <Modal type={modalType} onHide={hideModal} />
    </modalContext.Provider>
  );
};
