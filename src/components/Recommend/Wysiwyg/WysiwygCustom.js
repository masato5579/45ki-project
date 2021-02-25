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
import Button from "@material-ui/core/Button";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import CancelIcon from "@material-ui/icons/Cancel";

const videoPlugin = createVideoPluguin();
const imagePlugin = createImagePlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [videoPlugin, imagePlugin, inlineToolbarPlugin];

const WysiwygCustom = () => {
  const editor = useRef();

  const user = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [edit, setEdit] = useState();

  const [editorState, setEditorState] = useState(createEditorStateWithText(""));

  const [editorStateImg, setEditorStateImg] = useState(
    createEditorStateWithText("")
  );

  const toggleEditor = () => {
    setOpen(!open);
  };

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
        const recs = rec.map((r) => {
          const content = r.content;
          const dates = r.dates;
          return { content: content, dates: dates };
        });
        setEdit(recs);
      });
  }, []);

  const onSave = (e) => {
    e.preventDefault();
    const editTag = document.querySelector(".edit");
    const editTagString = editTag.outerHTML; //htmlを文字列にする
    setEdit(
      { content: editTagString, dates: String(new Date()) }[edit.length + 1]
    );
    firebase
      .firestore()
      .collection("recommend")
      .add({
        content: editTagString,
        dates: String(new Date()),
      });
  };

  const focus = () => {
    editor.current.focus();
  };

  return (
    <Container>
      <Head>
        <h1>おすすめ</h1>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddToPhotosIcon />}
          onClick={toggleEditor}
        >
          おすすめを追加
        </Button>
      </Head>
      <Wrap style={{ display: open ? "block" : "none" }}>
        <Row>
          <EditHead>
            <h2>Title</h2>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CancelIcon />}
              onClick={toggleEditor}
            >
              エディターを閉じる
            </Button>
          </EditHead>
          <Add>
            <div>
              <VideoAdd
                editorState={editorState}
                onChange={onChange}
                modifier={videoPlugin.addVideo}
              />
            </div>
            <div>
              <ImageAdd
                editorState={editorStateImg}
                onChange={onChange}
                modifier={imagePlugin.addImage}
              />
            </div>
          </Add>
          <Edit className="editor edit" onClick={focus}>
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
          </Edit>
          <ButtonWrap>
            <div>
              <Button
                onClick={onSave}
                variant="contained"
                color="secondary"
                startIcon={<AddToPhotosIcon />}
              >
                保存する
              </Button>
            </div>
          </ButtonWrap>
        </Row>
      </Wrap>
      <Ul>
        {edit ? (
          edit.map((ed) => (
            <div className="A" style={{ display: open ? "none" : "block" }}>
              <div>{ed.dates}</div>
              <div dangerouslySetInnerHTML={{ __html: ed.content }}></div>
            </div>
          ))
        ) : (
          <p>...loading</p>
        )}
      </Ul>
    </Container>
  );
};

export default WysiwygCustom;

const Container = styled.div`
  z-index: 1;
`;

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Add = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Edit = styled.div``;

const EditHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ButtonWrap = styled.div`
  text-align: right;
`;

const Row = styled.div`
  background: #ccffff;
  padding: 80px 5%;
  width: 100%;
  margin: 0 auto;
  .editor {
    min-height: 500px;
  }
`;

const Ul = styled.ul`
  margin: 0;
  margin-top: 30px;
`;
