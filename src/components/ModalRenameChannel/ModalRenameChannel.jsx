import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Form,
  Modal,
  Button,
  FloatingLabel,
} from 'react-bootstrap';
import useChat from '../../hooks/useChat.js';

const baseSchema = {
  name: yup.string()
    .min(3, { key: 'form.range', values: { min: 3, max: 20 } })
    .max(20, { key: 'form.range', values: { min: 3, max: 20 } })
    .required({ key: 'form.required' }),
};

const ModalRenameChannel = ({ removeModal, data }) => {
  const { id } = data;
  const inputRef = useRef(null);
  const { renameChannel } = useChat();
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

  const onSubmit = ({ name }, formik) => {
    const onSuccess = () => {
      formik.resetForm();
      toast.success(t('channel renamed'));
      hide();
    };

    const onError = (err) => {
      setError(err);
    };

    renameChannel({ id, name }, { onSuccess, onError });
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
        <Modal.Title>{t('rename channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FloatingLabel controlId="form-rename-name" label={t('channel name')}>
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

export default ModalRenameChannel;
