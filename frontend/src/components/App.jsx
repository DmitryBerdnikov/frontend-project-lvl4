import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import Header from './Header';
import Login from '../pages/Login';
import '../styles/index.scss';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<div>Hello world!</div>} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
