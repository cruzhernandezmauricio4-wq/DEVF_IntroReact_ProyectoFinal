// Sin onLike el tweet es de solo lectura (p. ej. en el perfil).
const Tweet = ({ tweet, onLike }) => {
  const author = tweet.author ?? "anónimo";

  return (
    <article className="tweet">
      <div className="avatar">{author[0].toUpperCase()}</div>
      <div className="tweet-body">
        <span className="tweet-author">@{author}</span>
        <p>{tweet.text}</p>
        {onLike ? (
          <button className="like" onClick={() => onLike(tweet.id)}>
            ❤ {tweet.likes}
          </button>
        ) : (
          <span className="like">❤ {tweet.likes}</span>
        )}
      </div>
    </article>
  );
};

export default Tweet;
