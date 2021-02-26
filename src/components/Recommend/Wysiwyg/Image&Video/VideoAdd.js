import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";

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
    <div>
      <VideoLibraryIcon />
      <input
        type="text"
        placeholder="paste the video url"
        onChange={ChangeUrl}
        value={url}
      />
      <Button
        onClick={addVideo}
        variant="contained"
        startIcon={<QueuePlayNextIcon />}
      >
        埋め込む
      </Button>
    </div>
  );
};

export default VideoAdd;
