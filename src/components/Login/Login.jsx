import React from 'react';
import { Formik } from 'formik';
import {
  FloatingLabel,
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const isSubmitDisabled = ({ values, isSubmitting }) => {
  if (isSubmitting) {
    return true;
  }

  const valuesNotEmpty = Object.values(values).every((n) => n !== '');
  return !valuesNotEmpty;
};

const Login = () => {
  const { t } = useTranslation();
  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Row className="py-5">
      <Col xs="6" className="mx-auto">
        <h2 className="mb-5">{t('log in')}</h2>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            isSubmitting,
            handleSubmit: formikHandleSubmit,
          }) => (
            <Form noValidate onSubmit={formikHandleSubmit}>
              <FloatingLabel label={t('username')} className="mb-3">
                <Form.Control
                  type="text"
                  placeholder={t('username')}
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                />
              </FloatingLabel>
              <FloatingLabel label={t('password')} className="mb-3">
                <Form.Control
                  type="text"
                  placeholder={t('password')}
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  {t('errors.login')}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button
                className="w-100"
                size="lg"
                type="submit"
                disabled={isSubmitDisabled({ values, isSubmitting })}
              >
                {t('form.send')}
              </Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default Login;
