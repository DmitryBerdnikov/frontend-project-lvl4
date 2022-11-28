import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Hello world!</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
