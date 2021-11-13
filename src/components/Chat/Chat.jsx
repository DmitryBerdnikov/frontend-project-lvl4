import React, { useEffect } from 'react';
import {
  Col,
  Row,
  Container,
  Button,
  Nav,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchDataAction } from '../../slices/index.js';

const Chat = () => {
  const { t } = useTranslation();
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

  return (
    <Container className="py-5 h-100">
      <Row className="row h-100 shadow bg-white rounded">
        <Col className="col-4 col-md-2 border-end pt-5">
          <div className="d-flex justify-content-between">
            <span>{t('channels')}</span>
            <Button size="sm" variant="primary">+</Button>
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
                    >
                      {name}
                    </Button>
                  </Nav.Item>
                ))}
              </Nav>
            )
          }
        </Col>
        <Col className="p-0 d-flex flex-column">
          <div className="p-3 border-bottom">
            { !!currentChannel && (
              <>
                <h1 className="h6 mb-0">{`# ${currentChannel.name}`}</h1>
                <div className="text-muted">{t('messageWithCount.text', { count: messages.length })}</div>
              </>
            )}
          </div>
          <div className="p-5 flex-grow-1">
            <div className="mb-2">
              <span className="fw-bold">username: </span>
              message
            </div>
          </div>
          <div className="px-5 py-3">
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder={t('form.message')}
                name="message"
              />
              <Button variant="primary" id="button-addon1">
                {t('form.send')}
              </Button>
            </InputGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
