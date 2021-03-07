import React, { useState, useRef, useEffect } from "react";

import firebase from "../../../Firebase/firebase";

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

import Head from "./Head";
import Article from "./Article";
import EditorHead from "./Editor/EditorHead";
import SaveButton from "./Editor/SaveButton";

const videoPlugin = createVideoPluguin();
const imagePlugin = createImagePlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [videoPlugin, imagePlugin, inlineToolbarPlugin];

const WysiwygCustom = (props) => {
  //editorをfocusするためのRef
  const editor = useRef();

  //userの名前
  const userName = String(props.Name);

  //おすすめのTitle
  const [title, setTitle] = useState("");

  //エディターの開け閉め
  const [open, setOpen] = useState(false);

  //firebaseに送信する内容
  const [edit, setEdit] = useState();

  //editorに入力した文字
  const [editorState, setEditorState] = useState(createEditorStateWithText(""));

  //Editorの開け閉め
  const toggleEditor = () => {
    setOpen(!open);
  };

  //入力input用State
  const onChange = (editorState) => {
    setEditorState(editorState);
  };

  //Titleのinput用State
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  //時間表示
  let date = new Date();
  const getStringFromDate = () => {
    let year_str = date.getFullYear();
    //月だけ+1すること
    let month_str = 1 + date.getMonth();
    let day_str = date.getDate();
    let hour_str = date.getHours();
    let minute_str = date.getMinutes();
    let second_str = date.getSeconds();

    let format_str = "YYYY/MM/DD hh:mm:ss";
    format_str = format_str.replace(/YYYY/g, year_str);
    format_str = format_str.replace(/MM/g, month_str);
    format_str = format_str.replace(/DD/g, day_str);
    format_str = format_str.replace(/hh/g, hour_str);
    format_str = format_str.replace(/mm/g, minute_str);
    format_str = format_str.replace(/ss/g, second_str);

    return format_str;
  };
  let rtn_str = getStringFromDate(date);

  //firebaseからのデータを同期
  useEffect(() => {
    firebase
      .firestore()
      .collection(userName)
      .orderBy("dates", "desc")
      .onSnapshot((snapshot) => {
        const rec = snapshot.docs.map((doc) => {
          return {
            docid: doc.id,
            ...doc.data(),
          };
        });
        const recs = rec.map((r) => {
          const docid = r.docid;
          const title = r.title;
          const content = r.content;
          const dates = r.dates;
          return { docid: docid, title: title, content: content, dates: dates };
        });
        setEdit(recs);
      });
  });

  //記事を保存
  const onSave = (e) => {
    e.preventDefault();
    const editTag = document.querySelector(".edit");
    const editTagString = editTag.outerHTML; //htmlを文字列にする
    setEdit(
      { title: title, content: editTagString, dates: rtn_str }[edit.length + 1]
    );
    console.log(edit);
    firebase.firestore().collection(userName).add({
      title: title,
      content: editTagString,
      dates: rtn_str,
    });
    setOpen(!open);
    alert("記事が追加されました。");
  };

  const deleteArticle = (docid) => {
    firebase.firestore().collection(userName).doc(docid).delete();
  };

  //editorにfocus
  const focus = () => {
    editor.current.focus();
  };

  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    console.log(type);
    if (type === "header-one") {
      return "myh1";
    }
    if (type === "header-two") {
      return "myh2";
    }
    if (type === "header-three") {
      return "myh3";
    }
  }

  return (
    <Container>
      <Head toggleEditor={toggleEditor} />
      <Wrap style={{ display: open ? "block" : "none" }}>
        <Row>
          <EditorHead
            onTitleChange={onTitleChange}
            toggleEditor={toggleEditor}
          />
          <Add>
            <AddWrap>
              <VideoAdd
                editorState={editorState}
                onChange={onChange}
                modifier={videoPlugin.addVideo}
              />
            </AddWrap>
            <AddWrap>
              <ImageAdd
                editorState={editorState}
                onChange={onChange}
                modifier={imagePlugin.addImage}
              />
            </AddWrap>
          </Add>
          <Edit className="editor edit" onClick={focus}>
            <Editor
              editorState={editorState}
              onChange={onChange}
              plugins={plugins}
              ref={(element) => {
                editor.current = element;
              }}
              placeholder="文字を入力してね...."
              blockStyleFn={myBlockStyleFn}
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
          <SaveButton onSave={onSave} />
        </Row>
      </Wrap>
      <Article edit={edit} open={open} deleteArticle={deleteArticle} />
    </Container>
  );
};

export default WysiwygCustom;

const Container = styled.div`
  z-index: 1;
  padding-bottom: 30px;
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

const Add = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  background: #f3ffe5;
  margin-bottom: 10px;
  padding: 0;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const AddWrap = styled.div`
  display: flex;
  margin: 30px 0;
  padding: 0 10px;
  @media (max-width: 768px) {
    margin: 10px 0;
    min-width: 120px;
  }
`;

const Edit = styled.div``;

const Row = styled.div`
  background-image: url("https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__480.jpg");
  background-repeat: repeat-y;
  background-size: contain;
  padding: 80px 5%;
  width: 100%;
  margin: 0 auto;
  .editor {
    min-height: 500px;
  }
`;
