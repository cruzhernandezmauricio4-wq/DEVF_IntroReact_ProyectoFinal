import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
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
    <>
      <Navbar user={user} logout={logout} />
      <main>
        {user ? (
          <TweetForm onAddTweet={addTweet} />
        ) : (
          <div className="card notice">
            <p>
              <Link to="/login">Inicia sesión</Link> para publicar tweets.
            </p>
          </div>
        )}
        <TweetList tweets={tweets} onLike={likeTweet} />
      </main>
    </>
  );
};

export default Home;
