import React, { useState } from "react";
import { EditorState } from "draft-js";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import createVideoPluguin from "@draft-js-plugins/video";
import createImagePlugin from "@draft-js-plugins/image";
import styled from "styled-components";
// import { stateToHTML } from "draft-js-export-html";

import VideoAdd from "./VideoAdd";
import ImageAdd from "./ImageAdd";

const videoPlugin = createVideoPluguin();
const imagePlugin = createImagePlugin();
const plugins = [videoPlugin, imagePlugin];

const text = "Click";
const PannelContents = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [editorStateImg, setEditorStateImg] = useState(
    createEditorStateWithText(text)
  );
  //   const [edit, setEdit] = useState("");

  const onChange = (editorState) => {
    setEditorState(editorState);
    setEditorStateImg(editorState);
  };

  const onSave = () => {
    // const editString = document.querySelector(".edit").outerHTML;
    // setEdit(editString);
  };

  return (
    <div>
      <h1>おすすめ</h1>
      <div className="edit">
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
        />
      </div>
      <VideoAdd
        editorState={editorState}
        onChange={onChange}
        modifier={videoPlugin.addVideo}
      />
      <ImageAdd
        editorState={editorStateImg}
        onChange={onChange}
        modifier={imagePlugin.addImage}
      />
      <div>
        <button onClick={onSave}>保存</button>
      </div>
    </div>
  );
};

export default PannelContents;
