import React, { useState, useRef, useEffect } from 'react';
import {
  FloatingLabel,
  Form,
  Row,
  Col,
  Button,
  Container,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import routes from 'src/routes';
import useAuth from 'hooks/useAuth';

const isSubmitDisabled = ({ values, isSubmitting }) => {
  if (isSubmitting) {
    return true;
  }

  const valuesNotEmpty = Object.values(values).every((n) => n !== '');
  return !valuesNotEmpty;
};

const Login = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const inputUsernameRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    inputUsernameRef.current.focus();
  }, []);

  const handleSubmit = async (values) => {
    throw new Error('unhandled error');

    try {
      const response = await axios.post(routes.loginPath(), values);
      setAuthFailed(false);
      localStorage.setItem('user', JSON.stringify(response.data));
      auth.logIn();
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        setAuthFailed(true);
        inputUsernameRef.current.focus();
        return;
      }

      throw err;
    }
  };

  return (
    <Container>
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
                <FloatingLabel label={t('your nickname')} className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder={t('your nickname')}
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    isInvalid={authFailed}
                    ref={inputUsernameRef}
                  />
                </FloatingLabel>
                <FloatingLabel label={t('password')} className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder={t('password')}
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    isInvalid={authFailed}
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
                  {t('send')}
                </Button>
              </Form>
            )}
          </Formik>
          <p className="mt-3 text-center">
            Нет аккаунта?
            {' '}
            <Link to="/signup">{t('registration')}</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
