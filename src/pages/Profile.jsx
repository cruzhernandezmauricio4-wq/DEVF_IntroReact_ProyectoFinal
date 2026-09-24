import { Link } from "react-router-dom";

const Profile = ({ user, logout }) => {
  const myTweets = (JSON.parse(localStorage.getItem("tweets")) || []).filter(
    (tweet) => tweet.author === user.username
  );

  return (
    <div>
      <h1>Perfil</h1>
      <p>Nombre de usuario: {user.username}</p>
      <Link to="/">Volver al inicio</Link>{" "}
      <button onClick={logout}>Cerrar sesión</button>

      <h2>Mis tweets</h2>
      {myTweets.length === 0 ? (
        <p>Aún no has publicado tweets.</p>
      ) : (
        myTweets.map((tweet) => (
          <div className="tweet" key={tweet.id}>
            <p>{tweet.text}</p>
            <span>❤ {tweet.likes}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
