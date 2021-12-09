import React, { createContext, useState } from 'react';
import ModalAddNewChannel from '../components/ModalAddNewChannel/ModalAddNewChannel.jsx';

// const modals = {
//   addNewChannel: {
//     component:
//   }
// }

const Modal = ({ type, hideModal }) => {
  if (!type) {
    return null;
  }

  const Component = ModalAddNewChannel;
  return <Component removeModal={hideModal} />;
};

export const modalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);

  const hideModal = () => {
    setModalType(null);
  };

  const showModal = (type) => {
    setModalType(type);
  };

  return (
    <modalContext.Provider value={{ showModal }}>
      {children}
      <Modal type={modalType} hideModal={hideModal} />
    </modalContext.Provider>
  );
};
