import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";
import styled from "styled-components";

const VideoAdd = (props) => {
  //動画のUrl
  const [url, setUrl] = useState("");

  //動画の追加
  const addVideo = () => {
    props.onChange(props.modifier(props.editorState, { src: url }));
  };

  //input入力
  const ChangeUrl = (evt) => {
    setUrl(evt.target.value);
  };

  return (
    <Container>
      <VideoLibraryIcon />
      <VideoWrap>
        <input
          type="text"
          placeholder="paste the video url"
          onChange={ChangeUrl}
          value={url}
        />
      </VideoWrap>
      <ButtonWrap>
        <Button
          onClick={addVideo}
          variant="contained"
          startIcon={<QueuePlayNextIcon />}
        >
          埋め込む
        </Button>
      </ButtonWrap>
    </Container>
  );
};

export default VideoAdd;

const Container = styled.div``;

const VideoWrap = styled.div``;

const ButtonWrap = styled.div``;
