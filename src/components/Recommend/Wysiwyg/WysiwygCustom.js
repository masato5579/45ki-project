import React, { useState, useRef, useContext, useEffect } from "react";

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

const WysiwygCustom = () => {
  const editor = useRef();

  const user = useContext(AuthContext);

  const [editorState, setEditorState] = useState(createEditorStateWithText(""));

  const [editorStateImg, setEditorStateImg] = useState(
    createEditorStateWithText("")
  );

  const [edit, setEdit] = useState();

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
        // console.log(rec[0].edit);
        // setEdit(rec[0].edit);
        // const recs = rec.map((r) => {
        //   return r.edit;
        // });
        // const dates = rec.map((r) => {
        //   return r.dates;
        // });
        console.log(rec);

        const recs = rec.map((r) => {
          const content = r.content;
          const dates = r.dates;
          return { content: content, dates: dates };
        });
        console.log(recs);
        setEdit(recs);
      });
  }, []);

  const onSave = (e) => {
    e.preventDefault();
    const editTag = document.querySelector(".edit");
    const editTag2 = editTag.outerHTML; //htmlを文字列にする
    setEdit({ content: editTag2, dates: String(new Date()) }[edit.length + 1]);
    console.log(edit.length + 1);

    firebase
      .firestore()
      .collection("recommend")
      .add({
        content: editTag2,
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
          placeholder="ここに記事を入力できるよ"
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

      <ul>
        {edit ? (
          edit.map((ed) => (
            <div className="A">
              <div dangerouslySetInnerHTML={{ __html: ed.content }}></div>
              <div>{ed.dates}</div>
            </div>
          ))
        ) : (
          <p>...loading</p>
        )}
      </ul>
    </Container>
  );
};

export default WysiwygCustom;

const Container = styled.div`
  z-index: 1;
`;

// <div dangerouslySetInnerHTML={{ __html: edit }}></div>
