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

const videoPlugin = createVideoPluguin();
const imagePlugin = createImagePlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [videoPlugin, imagePlugin, inlineToolbarPlugin];

const WysiwygCustom = () => {
  const editor = useRef();

  const [open, setOpen] = useState(false);

  const toggleEditor = () => {
    setOpen(!open);
  };

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
        console.log(recs[0]);
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
      <Row1>
        <h1>おすすめ</h1>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddToPhotosIcon />}
          onClick={toggleEditor}
        >
          記事を追加
        </Button>
      </Row1>
      <Wrap style={{ display: open ? "block" : "none" }}>
        <Row>
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
          <Col>
            <div>
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
            </div>
            <div>
              <div>
                <Button onClick={onSave} variant="contained" color="primary">
                  保存する
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AddToPhotosIcon />}
                  onClick={toggleEditor}
                >
                  エディターを閉じる
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Wrap>
      <Ul>
        {edit ? (
          edit.map((ed) => (
            <div className="A">
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
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Col = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Row = styled.div`
  background: #eee;
  padding: 160px 5%;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  .editor {
    height: 100%;
  }
`;

const Ul = styled.ul`
  margin: 0;
  margin-top: 30px;
`;

// <div dangerouslySetInnerHTML={{ __html: edit }}></div>
