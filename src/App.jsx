import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import AdminPanel from './pages/AdminPanel';
import Storefront from './pages/Storefront';
import Layout from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout><Dashboard /></Layout>} path="/" />
          <Route element={<Layout><Storefront /></Layout>} path="/tienda" />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<Layout><ProductList /></Layout>} path="/productos" />
          <Route element={<Layout><AdminPanel /></Layout>} path="/admin" />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;
