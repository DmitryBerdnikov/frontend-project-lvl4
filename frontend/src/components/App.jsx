import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Header from './Header';
import '../styles/index.scss';

const App = () => (
  <BrowserRouter>
    <Header />
    <main className="flex-grow-1">
      <Routes>
        <Route path="/" element={<div>Hello world!</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
