import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useChat from 'hooks/useChat.js';

const ModalRemoveChannel = ({ removeModal, data }) => {
  const { id } = data;
  const { removeChannel } = useChat();
  const { t } = useTranslation();

  const [isVisible, setVisibility] = useState(true);

  const hide = () => setVisibility(false);
  const handleRemove = () => {
    removeChannel(
      { id },
      {
        onSuccess: () => {
          toast.success(t('channel removed'));
        },
      },
    );
    hide();
  };

  return (
    <Modal show={isVisible} onHide={hide} onExited={removeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('remove channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('are you sure')}</p>
        <div className="d-flex justify-content-end mt-4">
          <Button variant="secondary" onClick={hide}>
            {t('cancel')}
          </Button>
          <Button variant="danger" className="ms-2" onClick={handleRemove}>
            {t('remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemoveChannel;
