import React, { useEffect, useRef } from 'react';
import {
  Col,
  Row,
  Container,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { addMessage, changeCurrentChannelId, fetchDataAction } from '../../slices/index.js';
import NewMessageForm from '../NewMessageForm/NewMessageForm.jsx';
import ChatAside from '../ChatAside/ChatAside.jsx';
import ChatHeader from '../ChatHeader/ChatHeader.jsx';
import Messages from '../Messages/Messages.jsx';

const Chat = () => {
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const { channels, messages, currentChannelId } = useSelector((state) => ({
    channels: state.channels,
    messages: state.messages,
    currentChannelId: state.currentChannelId,
  }));

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDataAction());
    };

    fetchData();

    const socket = io();
    socketRef.current = socket;

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
  }, []);

  const currentChannel = channels.find(({ id }) => id === currentChannelId);

  const handleSubmit = (values, formik) => {
    const message = {
      text: values.message,
      channelId: currentChannelId,
      username: JSON.parse(localStorage.getItem('user')).username,
    };

    socketRef.current.emit('newMessage', message, (response) => {
      if (response.status === 'ok') {
        formik.resetForm();
      }
    });
  };

  const filteredMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const onChangeChannel = (id) => dispatch(changeCurrentChannelId(id));

  return (
    <Container className="py-5 h-100">
      <Row className="row h-100 shadow bg-white rounded">
        <Col className="col-4 col-md-2 border-end pt-5">
          <ChatAside
            channels={channels}
            onChangeChannel={onChangeChannel}
            currentChannelId={currentChannelId}
          />
        </Col>
        <Col className="p-0 d-flex flex-column">
          <div className="p-3 border-bottom">
            <ChatHeader messages={filteredMessages} channel={currentChannel} />
          </div>
          <div className="p-5 flex-grow-1">
            <Messages messages={filteredMessages} />
          </div>
          <div className="px-5 py-3">
            <NewMessageForm handleSubmit={handleSubmit} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
