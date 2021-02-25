import React, { useState } from "react";
import ImageIcon from "@material-ui/icons/Image";

import Button from "@material-ui/core/Button";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

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
