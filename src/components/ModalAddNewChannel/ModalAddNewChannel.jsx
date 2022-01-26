import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import {
  Form,
  Modal,
  Button,
  FloatingLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import useChat from '../../hooks/useChat.js';

const baseSchema = {
  name: yup.string()
    .min(3, { key: 'form.range', values: { min: 3, max: 20 } })
    .max(20, { key: 'form.range', values: { min: 3, max: 20 } })
    .required({ key: 'form.required' }),
};

const ModalAddNewChannel = ({ removeModal }) => {
  const inputRef = useRef(null);
  const { addNewChannel, setCurrentChannel } = useChat();
  const { t } = useTranslation();
  const { channels } = useSelector((state) => ({
    channels: state.channels,
  }));

  const channelNames = channels.map((channel) => channel.name);

  const schema = yup.object().shape({
    name: baseSchema.name.notOneOf(channelNames, { key: 'form.unique' }),
  });

  const [isVisible, setVisibility] = useState(true);
  const [error, setError] = useState(null);

  const hide = () => setVisibility(false);
  const onEntered = () => {
    inputRef.current.focus();
  };

  const onSubmit = (values, formik) => {
    const onSuccess = ({ id }) => {
      formik.resetForm();
      setCurrentChannel({ id });
      toast.success(t('channel created'));
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
          <FloatingLabel controlId="form-add-new-channel-name" label={t('channel name')}>
            <Form.Control
              type="text"
              placeholder={t('channel name')}
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={errorMessage}
              ref={inputRef}
              id="form-add-new-channel-name"
            />
            <Form.Control.Feedback tooltip type="invalid">
              {errorMessage}
            </Form.Control.Feedback>
          </FloatingLabel>
          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={hide}>
              {t('cancel')}
            </Button>
            <Button variant="primary" type="submit" className="ms-2">
              {t('send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddNewChannel;
