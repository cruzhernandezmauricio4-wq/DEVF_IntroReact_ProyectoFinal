import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TweetList from "../components/TweetList";
import TweetForm from "../components/TweetForm";

const Home = ({ user, logout }) => {
  // Carga perezosa: evita que el efecto de guardado sobrescriba los datos
  // guardados con [] en el primer render.
  const [tweets, setTweets] = useState(
    () => JSON.parse(localStorage.getItem("tweets")) || []
  );

  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  const addTweet = (text) => {
    const newTweet = {
      id: Date.now(),
      text,
      likes: 0,
      author: user.username,
    };
    setTweets([newTweet, ...tweets]);
  };

  const likeTweet = (id) => {
    setTweets(
      tweets.map((tweet) =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
      )
    );
  };

  return (
    <div>
      <h1>Bienvenido a Twitter</h1>
      {user ? (
        <div>
          <p>Hola, {user.username}!</p>
          <Link to="/profile">Mi perfil</Link>{" "}
          <button onClick={logout}>Cerrar sesión</button>
          <TweetForm onAddTweet={addTweet} />
        </div>
      ) : (
        <p>
          <Link to="/login">Inicia sesión</Link> para publicar tweets.
        </p>
      )}
      <TweetList tweets={tweets} onLike={likeTweet} />
    </div>
  );
};

export default Home;
