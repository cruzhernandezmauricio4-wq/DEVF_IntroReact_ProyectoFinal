import Navbar from "../components/Navbar";
import Tweet from "../components/Tweet";

const Profile = ({ user, logout }) => {
  const myTweets = (JSON.parse(localStorage.getItem("tweets")) || []).filter(
    (tweet) => tweet.author === user.username
  );

  return (
    <>
      <Navbar user={user} logout={logout} />
      <main>
        <section className="card profile-header">
          <div className="avatar avatar-lg">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <h1>@{user.username}</h1>
            <p className="muted">
              {myTweets.length} {myTweets.length === 1 ? "tweet" : "tweets"}
            </p>
          </div>
        </section>

        <h2>Mis tweets</h2>
        {myTweets.length === 0 ? (
          <p className="empty">Aún no has publicado tweets.</p>
        ) : (
          <div className="card tweet-list">
            {myTweets.map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Profile;
