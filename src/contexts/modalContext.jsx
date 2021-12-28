import React, { createContext, useState } from 'react';
import ModalAddNewChannel from '../components/ModalAddNewChannel/ModalAddNewChannel.jsx';
import ModalRemoveChannel from '../components/ModalRemoveChannel/ModalRemoveChannel.jsx';
import ModalRenameChannel from '../components/ModalRenameChannel/ModalRenameChannel.jsx';

const modals = {
  addNewChannel: ModalAddNewChannel,
  removeChannel: ModalRemoveChannel,
  renameChannel: ModalRenameChannel,
};

const Modal = ({ type, data, hideModal }) => {
  if (!type) {
    return null;
  }

  const Component = modals[type];

  if (!Component) {
    console.warn(`Undefined modal type ${type}`);
    return null;
  }

  return <Component data={data} removeModal={hideModal} />;
};

export const modalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({ type: null, data: null });

  const hideModal = () => {
    setModal({ type: null, data: null });
  };

  const showModal = (type, payload) => {
    setModal({ type, data: payload });
  };

  return (
    <modalContext.Provider value={{ showModal }}>
      {children}
      <Modal type={modal.type} data={modal.data} hideModal={hideModal} />
    </modalContext.Provider>
  );
};
