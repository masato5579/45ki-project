import React, { useState, useRef, useContext, useEffect } from "react";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";

import firebase from "../../../Firebase/firebase";
import { AuthContext } from "../../../Route/AuthService";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import createInlineToolbarPlugin, {
  Separator,
} from "@draft-js-plugins/inline-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
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

  const user = useContext(AuthContext);

  const [editorState, setEditorState] = useState(
    createEditorStateWithText(text)
  );

  const [editorStateImg, setEditorStateImg] = useState(
    createEditorStateWithText(text)
  );

  const [edit, setEdit] = useState("");
  const onChange = (editorState) => {
    setEditorState(editorState);
    setEditorStateImg(editorState);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("recommend")
      .orderBy("dates", "desc")
      .onSnapshot((snapshot) => {
        const rec = snapshot.docs.map((doc) => {
          return doc.data();
        });
        console.log(rec[0].edit);
        setEdit(rec[0].edit);
      });
  }, []);

  const onSave = (e) => {
    e.preventDefault();
    const edit = document.querySelector(".edit");
    const edit2 = edit.outerHTML; //htmlを文字列にする
    setEdit(edit2);

    firebase
      .firestore()
      .collection("recommend")
      .add({
        edit: edit2,
        dates: String(new Date()),
      });
  };

  const focus = () => {
    editor.current.focus();
  };

  return (
    <Container>
      <h1>おすすめ</h1>
      <div className="editor edit" onClick={focus}>
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
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <HeadlineThreeButton {...externalProps} />
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
      <div dangerouslySetInnerHTML={{ __html: edit }}></div>
    </Container>
  );
};

export default WysiwygCustom;

const Container = styled.div`
  z-index: 1;
`;
