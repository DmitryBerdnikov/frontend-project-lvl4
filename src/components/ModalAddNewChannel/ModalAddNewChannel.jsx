import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import {
  Form,
  Modal,
  Button,
  FloatingLabel,
} from 'react-bootstrap';
import useChat from '../../hooks/useChat.js';

const schema = yup.object().shape({
  name: yup.string()
    .min(3, { key: 'form.validation.range', values: { min: 3, max: 20 } })
    .max(20, { key: 'form.validation.range', values: { min: 3, max: 20 } })
    .required({ key: 'form.validation.required' }),
});

const ModalAddNewChannel = ({ removeModal }) => {
  const inputRef = useRef(null);
  const { addNewChannel } = useChat();
  const { t } = useTranslation();

  const [isVisible, setVisibility] = useState(true);
  const [error, setError] = useState(null);

  const hide = () => setVisibility(false);
  const onEntered = () => {
    inputRef.current.focus();
  };

  const onSubmit = (values, formik) => {
    const onSuccess = () => {
      formik.resetForm();
      hide();
    };

    const onError = (err) => {
      setError(err);
    };

    addNewChannel(values, { onSuccess, onError });
  };

  const formik = useFormik({
    onSubmit,
    initialValues: { name: '' },
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const errorMessage = (() => {
    const { errors } = formik;

    if (errors.name) {
      return t(errors.name.key, errors.name.values);
    }

    if (error) {
      return t(error.key);
    }

    return null;
  })();

  return (
    <Modal
      show={isVisible}
      onHide={hide}
      onEntered={onEntered}
      onExited={removeModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('add channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FloatingLabel label={t('channel name')}>
            <Form.Control
              type="text"
              placeholder={t('channel name')}
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={errorMessage}
              ref={inputRef}
            />
            <Form.Control.Feedback tooltip type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </FloatingLabel>
          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={hide}>
              {t('form.cancel')}
            </Button>
            <Button variant="primary" type="submit" className="ms-2">
              {t('form.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddNewChannel;
