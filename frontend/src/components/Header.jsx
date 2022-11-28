import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => (
  <Navbar className="shadow-sm" bg="white">
    <Container>
      <Navbar.Brand as={Link} to="/">
        Hexlet Chat
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;
