import React, { useState } from "react";

const ImageAdd = (props) => {
  const [url, setUrl] = useState("");

  const addImage = () => {
    props.onChange(props.modifier(props.editorState, url));
  };

  const changeUrl = (evt) => {
    setUrl(evt.target.value);
  };

  return (
    <div>
      <h5>Imageの埋め込み</h5>
      <input
        type="text"
        placeholder="Paste the image url"
        onChange={changeUrl}
        value={url}
      />
      <button onClick={addImage}>Add</button>
    </div>
  );
};

export default ImageAdd;
