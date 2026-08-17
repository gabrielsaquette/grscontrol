import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import NovoLancamento from './pages/NovoLancamento';
import EmConstrucao from './pages/EmConstrucao';
import Administracao from './pages/Administracao';
import Producao from './pages/Producao';
import './styles/global.css';
import Estoque from './pages/Estoque';
import Almoxarifado from './pages/Almoxarifado';
import Manutencao from './pages/Manutencao';
import TI from './pages/TI';
import RH from './pages/RH';
import Logistica from './pages/Logistica';
// importação das telas
import ControleUsuarios from './pages/ti/usuarios/ControleUsuarios';
import CadastrarUsuario from './pages/ti/usuarios/CadastrarUsuario';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/novo"
            element={
              <ProtectedRoute>
                <NovoLancamento />
              </ProtectedRoute>
            }
          />

          <Route
            path="/administracao"
            element={
              <ProtectedRoute>
                <Administracao />
              </ProtectedRoute>
            }
          />

          <Route
            path="/producao"
            element={
              <ProtectedRoute>
                <Producao />
              </ProtectedRoute>
            }
          />

          <Route
            path="/estoque"
            element={
              <ProtectedRoute>
                <Estoque />
              </ProtectedRoute>
            }
          />

          <Route
            path="/almoxarifado"
            element={
              <ProtectedRoute>
                <Almoxarifado />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manutencao"
            element={
              <ProtectedRoute>
                <Manutencao />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ti"
            element={
              <ProtectedRoute>
                <TI />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ti/ControleUsuarios"
            element={
              <ProtectedRoute>
                <ControleUsuarios />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ti/CadastrarUsuario"
            element={
              <ProtectedRoute>
                <CadastrarUsuario />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rh"
            element={
              <ProtectedRoute>
                <RH />
              </ProtectedRoute>
            }
          />

          <Route
            path="/logistica"
            element={
              <ProtectedRoute>
                <Logistica />
              </ProtectedRoute>
            }
          />

          <Route
            path="/relatorios"
            element={
              <ProtectedRoute>
                <EmConstrucao titulo="Relatórios" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categorias"
            element={
              <ProtectedRoute>
                <EmConstrucao titulo="Categorias" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contas"
            element={
              <ProtectedRoute>
                <EmConstrucao titulo="Contas" />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}