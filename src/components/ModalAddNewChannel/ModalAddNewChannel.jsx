import React, { useState, useRef, useEffect } from 'react';
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
    .min(3, { key: 'form.validation.min', values: { min: 3 } })
    .max(20, { key: 'form.validation.max', values: { max: 20 } })
    .required({ key: 'form.validation.required' }),
});

const ModalAddNewChannel = ({ isVisible, onHide }) => {
  const inputRef = useRef(null);
  const { addNewChannel } = useChat();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { t } = useTranslation();
  const [show, setShow] = useState(isVisible);
  const handleClose = () => setShow(false);

  const formik = useFormik({
    onSubmit: (values, f) => {
      addNewChannel(values);
      f.resetForm();
      onHide();
    },
    initialValues: { name: '' },
    validationSchema: schema,
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      onExited={onHide}
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
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              ref={inputRef}
            />
            <Form.Control.Feedback tooltip type="invalid">
              {formik.errors.name && t(formik.errors.name.key, formik.errors.name.values)}
            </Form.Control.Feedback>
          </FloatingLabel>
          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={handleClose}>
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
