import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Col,
  Row,
  Container,
  Button,
  Nav,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const Chat = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    channels: [],
    currentChannelId: null,
    messages: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        setData(response.data);
      } catch (err) {
        console.warn('can not fetch data for chat');
      }
    };

    fetchData();
  }, []);

  const currentChannel = data.channels.find(({ id }) => id === data.currentChannelId);

  return (
    <Container className="py-5 h-100">
      <Row className="row h-100 shadow bg-white rounded">
        <Col className="col-4 col-md-2 border-end pt-5">
          <div className="d-flex justify-content-between">
            <span>{t('channels')}</span>
            <Button size="sm" variant="primary">+</Button>
          </div>
          {
            !!data.channels.length && (
              <Nav as="ul" variant="pills" className="mt-3 flex-column">
                {data.channels.map(({ id, name }) => (
                  <Nav.Item
                    as="li"
                    key={id}
                  >
                    <Button
                      variant={data.currentChannelId === id ? 'secondary' : ''}
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
                <div className="text-muted">{t('messageWithCount.text', { count: data.messages.length })}</div>
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
