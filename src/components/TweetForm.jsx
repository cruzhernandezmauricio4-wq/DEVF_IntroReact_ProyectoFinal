import { useState } from "react";

const MAX_LENGTH = 280;

const TweetForm = ({ onAddTweet }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTweet(text);
    setText("");
  };

  return (
    <form className="card tweet-form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="¿Qué estás pensando?"
        maxLength={MAX_LENGTH}
        rows={3}
      />
      <div className="tweet-form-footer">
        <span className="counter">
          {text.length}/{MAX_LENGTH}
        </span>
        <button className="btn" type="submit" disabled={!text.trim()}>
          Tweet
        </button>
      </div>
    </form>
  );
};

export default TweetForm;
