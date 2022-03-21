import React from "react";
import "./styles.css";
import { useState } from "react";
export default function App() {
  const [input, setInput] = useState("");
  const [isClicked, setClicked] = useState(false);
  const [gif, setGif] = useState("");

  const [gifUrl, setGifUrl] = useState("");
  const url = "https://api.giphy.com/v1/gifs/search";
  const api_key = "MkWtyXTaaqRHs8Ne8O72qlB2PPAEiHXc";
  const [isPosted, setPosted] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  function toggleGif() {
    isClicked ? setClicked(false) : setClicked(true);
  }

  function FetchGif() {
    fetch(`${url}?api_key=${api_key}&limit=1&q=${gif}`)
      .then((res) => res.json())
      .then((data) => setGifUrl(data.data[0].images.downsized.url))
      .catch((e) => console.log(e));
  }

  function submitPost() {
    if (input !== "" || gifUrl !== "") {
      setAllPosts([...allPosts, { postText: input, postGif: gifUrl }]);
      setPosted(true);
    }
    setInput("");
    setClicked(false);
    setGif("");
    setGifUrl("");
  }
  return (
    <div className="App">
      <div className="create-post">
        <h1>Create Post</h1>
        <textarea
          placeholder="type your msg here"
          className="post-text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        {isClicked && <img src={gifUrl} alt="gif" />}
        <button className="gif-search" onClick={toggleGif}>
          Add gif
        </button>
        {isClicked && (
          <span>
            <input
              placeholder="type gif phrase"
              onChange={(e) => setGif(e.target.value)}
            />
            <button onClick={FetchGif}>search</button>
            <button onClick={toggleGif}>X</button>
          </span>
        )}
        <button className="post-btn" onClick={submitPost}>
          POST
        </button>
      </div>
      <h1>Your posts</h1>

      {allPosts.map(({ postText, postGif }) => {
        return (
          <div className="show-post">
            <p>{postText}</p>
            {postGif !== "" && <img src={postGif} alt="gif" />}
          </div>
        );
      })}
    </div>
  );
}
