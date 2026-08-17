import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { entrar } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const resposta = await login(email, senha);
      entrar(resposta.usuario);
      navigate('/');
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login-pagina">
      <form className="login-cartao" onSubmit={handleSubmit}>
        <h1 className="login-titulo">GRSControl</h1>
        <p className="login-subtitulo">Entre com sua conta para continuar</p>

        <label className="login-rotulo" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          className="login-campo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />

        <label className="login-rotulo" htmlFor="senha">
          Senha
        </label>
        <input
          id="senha"
          type="password"
          className="login-campo"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && <p className="login-erro">{erro}</p>}

        <button type="submit" className="login-botao" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <span className="login-marca-dagua">Desenvolvido por Gabriel Saquette</span>
    </div>
  );
}