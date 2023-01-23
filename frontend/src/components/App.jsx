import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Header from './Header';
import WithAuth from './WithAuth';
import '../styles/index.scss';

import { AuthProvider } from '../contexts/AuthContext';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <WithAuth>
                <div>Hello world!</div>
              </WithAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
