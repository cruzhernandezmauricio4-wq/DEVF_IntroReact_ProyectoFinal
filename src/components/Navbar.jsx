import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        🐦 Twitter Clon
      </Link>
      <nav>
        <NavLink to="/" end>
          Inicio
        </NavLink>
        {user ? (
          <>
            <NavLink to="/profile">Perfil</NavLink>
            <button className="btn btn-outline" onClick={logout}>
              Salir
            </button>
          </>
        ) : (
          <NavLink to="/login">Iniciar sesión</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
