import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <header>
      <Navbar bg="white" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          {auth.loggedIn && <Button onClick={() => auth.logOut()}>{t('log out')}</Button>}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
