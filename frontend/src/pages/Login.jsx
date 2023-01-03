import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import LoginImgSrc from '../../public/static/images/login-img.jpg';

const Login = () => {
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
                <Form className="bg-white rounded-2">
                  <fieldset>
                    <legend className="h1 text-center mb-4">Войти</legend>
                    <FloatingLabel className="mb-4" label="Ваш ник">
                      <Form.Control type="email" />
                    </FloatingLabel>
                    <FloatingLabel className="mb-4" label="Пароль">
                      <Form.Control type="password" />
                    </FloatingLabel>
                    <Button className="w-100" variant="primary" type="Войти">
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
