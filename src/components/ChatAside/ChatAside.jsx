import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useModal from '../../hooks/useModal.js';

const ChatAside = ({ channels, onChangeChannel, currentChannelId }) => {
  const { t } = useTranslation();
  const { showModal } = useModal();

  return (
    <>
      <div className="d-flex justify-content-between">
        <span>{t('channels')}</span>
        <Button size="sm" variant="primary" onClick={() => showModal('ModalAddNewChannel')}>+</Button>
      </div>
      {
        !!channels.length && (
          <Nav as="ul" variant="pills" className="mt-3 flex-column">
            {channels.map(({ id, name }) => (
              <Nav.Item
                as="li"
                key={id}
              >
                <Button
                  variant={currentChannelId === id ? 'secondary' : ''}
                  className="rounded-0 w-100 text-start"
                  onClick={() => onChangeChannel(id)}
                >
                  {name}
                </Button>
              </Nav.Item>
            ))}
          </Nav>
        )
      }
    </>
  );
};

export default ChatAside;
