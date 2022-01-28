import React, { useState, useRef, useEffect } from 'react';
import {
  FloatingLabel,
  Form,
  Row,
  Col,
  Button,
  Container,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import isSubmitDisabled from '../utils/isSubmitDisabled';

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

  const onSubmit = async ({ password, username }) => {
    try {
      await auth.logIn({ username, password });
      setAuthFailed(false);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response.status === 401) {
        setAuthFailed(true);
        inputUsernameRef.current.focus();
        return;
      }

      throw err;
    }
  };

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit,
  });

  return (
    <Container>
      <Row className="py-5">
        <Col xs="6" className="mx-auto">
          <h2 className="mb-5">{t('log in')}</h2>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <FloatingLabel
              controlId="form-login-nickname"
              label={t('your nickname')}
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder={t('your nickname')}
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                isInvalid={authFailed}
                ref={inputUsernameRef}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="form-login-password"
              label={t('password')}
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder={t('password')}
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                isInvalid={authFailed}
              />
              <Form.Control.Feedback tooltip type="invalid">
                {authFailed && t('errors.login')}
              </Form.Control.Feedback>
            </FloatingLabel>
            <Button
              className="w-100"
              size="lg"
              type="submit"
              disabled={isSubmitDisabled({
                values: formik.values,
                isSubmitting: formik.isSubmitting,
              })}
            >
              {t('log in')}
            </Button>
          </Form>
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
