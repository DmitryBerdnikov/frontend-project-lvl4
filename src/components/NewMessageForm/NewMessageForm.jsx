import React from 'react';
import {
  Button,
  InputGroup,
  FormControl,
  Form,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

const NewMessageForm = ({ handleSubmit }) => {
  const { t } = useTranslation();

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
