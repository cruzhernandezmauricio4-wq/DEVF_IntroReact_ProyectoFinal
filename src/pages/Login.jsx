import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Escribe un nombre de usuario.");
      return;
    }
    onLogin(username.trim());
    navigate("/");
  };

  return (
    <div className="login-page">
      <form className="card login-card" onSubmit={handleSubmit}>
        <div className="login-logo">🐦</div>
        <h1>Inicia sesión</h1>
        <p className="muted">Elige un nombre de usuario para entrar.</p>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          autoFocus
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />
        {error && <p role="alert">{error}</p>}
        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
