import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LoginImgSrc from '../../public/static/images/login-img.jpg';

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const {
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    isValid,
  } = useFormik({
    validationSchema,
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (formValues) => {
      console.log({ formValues });
    },
  });

  return (
    <Container className="h-100 py-5">
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-lg-6 d-flex justify-content-center align-items-center">
                <img
                  className="rounded-circle"
                  src={LoginImgSrc}
                  width="200"
                  height="200"
                  alt="Нарисованный человек на горе"
                />
              </div>
              <div className="col-lg-6">
                <Form className="bg-white rounded-2" onSubmit={handleSubmit}>
                  <fieldset>
                    <legend className="h1 text-center mb-4">Войти</legend>
                    <FloatingLabel className="mb-4" label="Ваш ник">
                      <Form.Control
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={values.username}
                        onBlur={handleBlur}
                        isInvalid={errors.username && touched.username}
                        required
                      />
                    </FloatingLabel>
                    <FloatingLabel className="mb-4" label="Пароль">
                      <Form.Control
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        isInvalid={errors.password && touched.password}
                        required
                      />
                      {!isValid && (
                        <Form.Control.Feedback type="invalid" tooltip>
                          Неверные имя пользователя или пароль
                        </Form.Control.Feedback>
                      )}
                    </FloatingLabel>
                    <Button
                      className="w-100"
                      variant="primary"
                      type="Войти"
                      disabled={!isValid}
                    >
                      Submit
                    </Button>
                  </fieldset>
                </Form>
              </div>
            </div>
            <div className="card-footer p-4">
              <p className="text-center mb-0">
                Нет аккаунта? <Link to="/signup">Регистрация</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
