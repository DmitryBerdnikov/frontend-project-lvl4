import React, { useEffect, useRef } from 'react';
import {
  Button,
  InputGroup,
  FormControl,
  Form,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useChat from '../../hooks/useChat.js';

const NewMessageForm = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { addMessage } = useChat();
  const { currentChannelId } = useSelector((state) => ({
    currentChannelId: state.currentChannelId,
  }));

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (values, formik) => {
    const message = {
      text: values.message,
      channelId: currentChannelId,
      username: JSON.parse(localStorage.getItem('user')).username,
    };

    const onSuccess = () => {
      formik.resetForm();
    };

    addMessage(message, { onSuccess });
  };

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        handleSubmit: formikHandleSubmit,
      }) => (
        <Form onSubmit={formikHandleSubmit}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder={t('form.message')}
              name="message"
              value={values.message}
              onChange={handleChange}
              ref={inputRef}
            />
            <Button variant="primary" type="submit">
              {t('form.send')}
            </Button>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export default NewMessageForm;
