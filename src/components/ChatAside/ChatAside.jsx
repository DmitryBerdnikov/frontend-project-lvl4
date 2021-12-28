import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Nav,
  Dropdown,
  ButtonGroup,
  Col,
} from 'react-bootstrap';
import useChat from '../../hooks/useChat.js';
import useModal from '../../hooks/useModal.js';

const Channel = ({ name, onClick, isActive }) => (
  <Button
    variant={isActive ? 'secondary' : ''}
    className="rounded-0 w-100 text-start"
    onClick={onClick}
  >
    {name}
  </Button>
);

const EditableChannel = ({
  id,
  name,
  onClick,
  isActive,
}) => {
  const { showModal } = useModal();

  return (
    <Dropdown className="d-flex" as={ButtonGroup}>
      <Channel
        name={name}
        onClick={onClick}
        isActive={isActive}
      />
      <Dropdown.Toggle className="flex-grow-0" variant={isActive ? 'secondary' : ''} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => showModal('removeChannel', { id })}>Удалить</Dropdown.Item>
        <Dropdown.Item onClick={onClick}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Channels = ({ channels, currentChannelId, onChangeChannel }) => {
  if (!channels.length) {
    return null;
  }

  return (
    <Nav as="ul" variant="pills" className="mt-3 flex-column">
      {channels.map(({ id, name, removable }) => {
        const Component = removable ? EditableChannel : Channel;

        return (
          <Nav.Item
            as="li"
            key={id}
          >
            <Component
              name={name}
              id={id}
              onClick={() => onChangeChannel(id)}
              isActive={currentChannelId === id}
            />
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

const ChatAside = ({ channels, onChangeChannel, currentChannelId }) => {
  const { t } = useTranslation();
  const { showModal } = useModal();

  return (
    <Col className="col-4 col-md-2 border-end pt-5">
      <div className="d-flex justify-content-between">
        <span>{t('channels')}</span>
        <Button size="sm" variant="primary" onClick={() => showModal('addNewChannel')}>+</Button>
      </div>
      <Channels
        currentChannelId={currentChannelId}
        channels={channels}
        onChangeChannel={onChangeChannel}
      />
    </Col>
  );
};

export default ChatAside;
