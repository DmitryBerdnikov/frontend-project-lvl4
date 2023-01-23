import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import useAuth from '../hooks/useAuth';

const Header = () => {
  const { isLoggedIn, logOut } = useAuth();

  return (
    <Navbar className="shadow-sm" bg="white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        {isLoggedIn && <Button onClick={logOut}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
