import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import AddIcon from "@material-ui/icons/Add";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";

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
