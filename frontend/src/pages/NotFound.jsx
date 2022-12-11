import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const NotFound = () => (
  <Container className="h-100 py-4 d-flex flex-column align-items-center justify-content-center text-center">
    <h1>Страница не найдена</h1>
    <p>
      Но вы можете перейти
      {' '}
      <Link to="/">на главную страницу</Link>
    </p>
  </Container>
);

export default NotFound;
