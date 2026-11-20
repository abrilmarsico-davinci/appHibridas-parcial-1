import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './styles/index.css';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  return token ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { token, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  return (
    <Routes>
      {token ? (
        <>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
