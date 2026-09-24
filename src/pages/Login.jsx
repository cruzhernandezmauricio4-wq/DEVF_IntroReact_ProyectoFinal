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
    <form onSubmit={handleSubmit}>
      <h1>Iniciar sesión</h1>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setError("");
        }}
      />
      <button type="submit">Iniciar sesión</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
};

export default Login;
