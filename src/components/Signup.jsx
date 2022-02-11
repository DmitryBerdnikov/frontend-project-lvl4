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
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';
import useAuth from '../hooks/useAuth';
import isSubmitDisabled from '../utils/isSubmitDisabled';

const baseSchema = {
  username: yup
    .string()
    .min(3, { key: 'form.range', values: { min: 3, max: 20 } })
    .max(20, { key: 'form.range', values: { min: 3, max: 20 } })
    .required({ key: 'form.required' }),
  password: yup
    .string()
    .min(6, { key: 'form.minValue', values: { min: 6 } })
    .required({ key: 'form.required' }),
  passwordConfirmation: yup
    .string()
    .required({ key: 'form.required' })
    .oneOf([yup.ref('password'), null], { key: 'form.matchPasswords' }),
};

const Signup = () => {
  const { t } = useTranslation();
  const inputUsernameRef = useRef(null);
  const [signupError, setSignupError] = useState(null);
  const schema = yup.object().shape({ ...baseSchema });
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    inputUsernameRef.current.focus();
  }, []);

  const onSubmit = async ({ username, password }) => {
    try {
      await auth.signup({ username, password });

      setSignupError(null);
      navigate(routes.homePage());
    } catch (err) {
      if (err.response.status === 409) {
        setSignupError({ key: 'errors.userExitsts' });
        inputUsernameRef.current.focus();
        return;
      }
      throw err;
    }
  };

  const formik = useFormik({
    validationSchema: schema,
    initialValues: { username: '', password: '', passwordConfirmation: '' },
    onSubmit,
  });

  const fieldErrors = {
    username: (() => {
      if (signupError) {
        return t(signupError.key);
      }

      if (formik.touched.username && formik.errors.username) {
        return t(formik.errors.username.key, formik.errors.username.values);
      }

      return false;
    })(),

    password: formik.touched.password
      && formik.errors.password
      && t(formik.errors.password.key, formik.errors.password.values),

    passwordConfirmation: formik.touched.passwordConfirmation
      && formik.errors.passwordConfirmation
      && t(formik.errors.passwordConfirmation.key, formik.errors.passwordConfirmation.values),
  };

  return (
    <Container>
      <Row className="py-5">
        <Col xs="6" className="mx-auto">
          <h2 className="mb-5">{t('registration')}</h2>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <FloatingLabel
              controlId="form-signup-username"
              label={t('username')}
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder={t('username')}
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                isInvalid={fieldErrors.username}
                ref={inputUsernameRef}
              />
              <Form.Control.Feedback tooltip type="invalid">
                {fieldErrors.username}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              controlId="form-signup-password"
              label={t('password')}
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder={t('password')}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={fieldErrors.password}
              />
              <Form.Control.Feedback tooltip type="invalid">
                {fieldErrors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              controlId="form-signup-password-confirmation"
              label={t('confirm password')}
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder={t('confirm password')}
                name="passwordConfirmation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirmation}
                isInvalid={fieldErrors.passwordConfirmation}
              />
              <Form.Control.Feedback tooltip type="invalid">
                {fieldErrors.passwordConfirmation}
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
              {t('register')}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
