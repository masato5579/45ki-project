import React, { useState, useRef } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import createInlineToolbarPlugin, {
  Separator,
} from "@draft-js-plugins/inline-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from "@draft-js-plugins/buttons";

import createVideoPluguin from "@draft-js-plugins/video";
import createImagePlugin from "@draft-js-plugins/image";

import VideoAdd from "./Image&Video/VideoAdd";
import ImageAdd from "./Image&Video/ImageAdd";

import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "../../../index.css";
import styled from "styled-components";

const videoPlugin = createVideoPluguin();
const imagePlugin = createImagePlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [videoPlugin, imagePlugin, inlineToolbarPlugin];

const text =
  "Remember to place the <Toolbar> component bellow the Editor component …";

const WysiwygCustom = () => {
  const editor = useRef();

  const [editorState, setEditorState] = useState(
    createEditorStateWithText(text)
  );

  const [editorStateImg, setEditorStateImg] = useState(
    createEditorStateWithText(text)
  );

  const onChange = (editorState) => {
    setEditorState(editorState);
    setEditorStateImg(editorState);
  };

  const onSave = () => {
    // const editString = document.querySelector(".edit").outerHTML;
    // setEdit(editString);
  };

  const focus = () => {
    editor.current.focus();
  };

  return (
    <Container>
      <h1>おすすめ</h1>
      <div className="editor" onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={(element) => {
            editor.current = element;
          }}
        />
        <InlineToolbar>
          {(externalProps) => (
            <React.Fragment>
              <ItalicButton {...externalProps} />
              <BoldButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />
              <Separator {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
            </React.Fragment>
          )}
        </InlineToolbar>
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
    </Container>
  );
};

export default WysiwygCustom;

const Container = styled.div`
  z-index: 1;
`;
