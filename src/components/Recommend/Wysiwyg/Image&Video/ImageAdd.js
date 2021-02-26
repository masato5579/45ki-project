import React, { useState } from "react";
import ImageIcon from "@material-ui/icons/Image";

import Button from "@material-ui/core/Button";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const ImageAdd = (props) => {
  //画像のUrl
  const [url, setUrl] = useState("");

  //画像の追加
  const addImage = () => {
    props.onChange(props.modifier(props.editorState, url));
  };

  //input欄
  const changeUrl = (evt) => {
    setUrl(evt.target.value);
  };

  return (
    <div>
      <ImageIcon />
      <input
        type="text"
        placeholder="Paste the image url"
        onChange={changeUrl}
        value={url}
      />
      <Button
        onClick={addImage}
        variant="contained"
        startIcon={<AddPhotoAlternateIcon />}
      >
        埋め込む
      </Button>
    </div>
  );
};

export default ImageAdd;
