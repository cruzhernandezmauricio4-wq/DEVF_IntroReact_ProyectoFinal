import Tweet from "./Tweet";

const TweetList = ({ tweets, onLike }) => {
  if (tweets.length === 0) {
    return <p className="empty">Aún no hay tweets. ¡Sé el primero!</p>;
  }

  return (
    <div className="card tweet-list">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} onLike={onLike} />
      ))}
    </div>
  );
};

export default TweetList;
