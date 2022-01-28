import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();

  return (
    <Container className="py-5 h-100 d-flex flex-column align-items-center justify-content-center">
      <h1>Error 404</h1>
      <p>{t('page not found')}</p>
      <Link class="btn btn-primary" to="/">{t('return to home page')}</Link>
    </Container>
  );
};
