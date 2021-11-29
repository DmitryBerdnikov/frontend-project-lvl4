import React, { useEffect } from 'react';
import {
  Col,
  Row,
  Container,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentChannelId, fetchDataAction } from '../../slices/index.js';
import NewMessageForm from '../NewMessageForm/NewMessageForm.jsx';
import ChatAside from '../ChatAside/ChatAside.jsx';
import ChatHeader from '../ChatHeader/ChatHeader.jsx';
import Messages from '../Messages/Messages.jsx';
import { ModalProvider } from '../../contexts/modalContext.jsx';
import { ChatProvider } from '../../contexts/chatContext.jsx';

const Chat = () => {
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
  }, []);

  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const filteredMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  const onChangeChannel = (id) => dispatch(changeCurrentChannelId(id));

  return (
    <ChatProvider>
      <ModalProvider>
        <Container className="py-5 h-100">
          <Row className="row h-100 shadow bg-white rounded">
            <ChatAside
              channels={channels}
              onChangeChannel={onChangeChannel}
              currentChannelId={currentChannelId}
            />
            <Col className="p-0 d-flex flex-column">
              <div className="p-3 border-bottom">
                <ChatHeader messages={filteredMessages} channel={currentChannel} />
              </div>
              <div className="p-5 flex-grow-1">
                <Messages messages={filteredMessages} />
              </div>
              <div className="px-5 py-3">
                <NewMessageForm />
              </div>
            </Col>
          </Row>
        </Container>
      </ModalProvider>
    </ChatProvider>
  );
};

export default Chat;
