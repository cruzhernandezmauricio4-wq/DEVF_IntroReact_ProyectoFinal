import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/auth";

const MIN_USERNAME = 3;
const MIN_PASSWORD = 6;

const Register = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = username.trim();

    if (name.length < MIN_USERNAME) {
      setError(`El usuario debe tener al menos ${MIN_USERNAME} caracteres.`);
      return;
    }
    if (password.length < MIN_PASSWORD) {
      setError(`La contraseña debe tener al menos ${MIN_PASSWORD} caracteres.`);
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const registerError = await registerUser(name, password);
    if (registerError) {
      setError(registerError);
      return;
    }

    onLogin(name);
    navigate("/");
  };

  return (
    <div className="login-page">
      <form className="card login-card" onSubmit={handleSubmit}>
        <div className="login-logo">🐦</div>
        <h1>Crea tu cuenta</h1>
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
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            setError("");
          }}
        />
        {error && <p role="alert">{error}</p>}
        <button className="btn" type="submit">
          Registrarme
        </button>
        <p className="muted">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
