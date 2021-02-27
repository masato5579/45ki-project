import React, { useState } from "react";
import ImageIcon from "@material-ui/icons/Image";

import Button from "@material-ui/core/Button";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import styled from "styled-components";

const ImageAdd = (props) => {
  //画像のUrl
  const [url, setUrl] = useState("");

  //画像の追加
  const addImage = () => {
    props.onChange(props.modifier(props.editorState, url));
    console.log(url);
  };

  //input欄
  const changeUrl = (evt) => {
    setUrl(evt.target.value);
  };

  return (
    <div>
      <ImageIcon />
      <InputWrap>
        <input
          type="text"
          placeholder="Paste the image url"
          onChange={changeUrl}
          value={url}
        />
      </InputWrap>
      <ButtonWrap>
        <Button
          onClick={addImage}
          variant="contained"
          startIcon={<AddPhotoAlternateIcon />}
        >
          埋め込む
        </Button>
      </ButtonWrap>
    </div>
  );
};

export default ImageAdd;

const InputWrap = styled.div``;

const ButtonWrap = styled.div``;
