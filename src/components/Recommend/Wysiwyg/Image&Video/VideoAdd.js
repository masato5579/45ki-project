import React, { useState } from "react";

const VideoAdd = (props) => {
  const [url, setUrl] = useState("");

  const addVideo = () => {
    props.onChange(props.modifier(props.editorState, { src: url }));
  };

  const ChangeUrl = (evt) => {
    setUrl(evt.target.value);
  };

  return (
    <div>
      <h5>videoの埋め込み</h5>
      <input
        type="text"
        placeholder="paste the video url"
        onChange={ChangeUrl}
        value={url}
      />
      <button onClick={addVideo}>Add</button>
    </div>
  );
};

export default VideoAdd;
