import React from 'react';
import {
  Navbar,
  Container,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const auth = useAuth();

  return (
    <header>
      <Navbar bg="white" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">ChatApp</Navbar.Brand>
          {auth.loggedIn && <Button onClick={() => auth.logOut()}>Log out</Button>}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
