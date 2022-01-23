import React, { useState, useRef, useEffect } from 'react';
import {
  FloatingLabel,
  Form,
  Row,
  Col,
  Button,
  Container,
} from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import useAuth from '../../hooks/useAuth';

const baseSchema = {
  username: yup
    .string()
    .min(3, { key: 'form.validation.range', values: { min: 3, max: 20 } })
    .max(20, { key: 'form.validation.range', values: { min: 3, max: 20 } })
    .required({ key: 'form.validation.required' }),
  password: yup
    .string()
    .min(6, { key: 'form.validation.minValue', values: { min: 6 } })
    .required({ key: 'form.validation.required' }),
  confirmPassword: yup
    .string()
    .min(6, { key: 'form.validation.minValue', values: { min: 6 } })
    .required({ key: 'form.validation.required' })
    .oneOf([yup.ref('password'), null], { key: 'form.validation.matchPasswords' }),
};

const isSubmitDisabled = ({ values, isSubmitting }) => {
  if (isSubmitting) {
    return true;
  }

  const valuesNotEmpty = Object.values(values).every((n) => n !== '');
  return !valuesNotEmpty;
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

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(routes.signupPath(), values);
      setSignupError(null);
      localStorage.setItem('user', JSON.stringify(response.data));
      auth.logIn();
      navigate('/');
    } catch (err) {
      if (err.isAxiosError && err.response.status === 409) {
        setSignupError({ key: 'errors.userExitsts' });
        inputUsernameRef.current.focus();
        return;
      }
      throw err;
    }
  };

  const formik = useFormik({
    validationSchema: schema,
    initialValues: { username: '', password: '', confirmPassword: '' },
    onSubmit,
  });

  return (
    <Container>
      <Row className="py-5">
        <Col xs="6" className="mx-auto">
          <h2 className="mb-5">{t('registration')}</h2>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <FloatingLabel label={t('username')} className="mb-3">
              <Form.Control
                type="text"
                placeholder={t('username')}
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                isInvalid={signupError || (formik.touched.username && formik.errors.username)}
                ref={inputUsernameRef}
              />
              <Form.Control.Feedback tooltip type="invalid">
                {(signupError && t(signupError.key)) || (formik.errors.username
                  && t(formik.errors.username.key, formik.errors.username.values))}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel label={t('password')} className="mb-3">
              <Form.Control
                type="password"
                placeholder={t('password')}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback tooltip type="invalid">
                {formik.errors.password
                  && t(formik.errors.password.key, formik.errors.password.values)}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel label={t('form.confirmPassword')} className="mb-3">
              <Form.Control
                type="password"
                placeholder={t('form.confirmPassword')}
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
              <Form.Control.Feedback tooltip type="invalid">
                {formik.errors.confirmPassword
                  && t(formik.errors.confirmPassword.key, formik.errors.confirmPassword.values)}
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
              {t('form.send')}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
