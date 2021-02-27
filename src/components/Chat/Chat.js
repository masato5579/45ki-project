import React, { useEffect, useState, useContext } from "react";
import Header from "../common/Header";
import Navigation from "../common/Navigation";

import firebase from "../../Firebase/firebase";
import { AuthContext } from "../../Route/AuthService";

import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import styled from "styled-components";

const Chat = () => {
  const [messages, setMessages] = useState(null);
  const [value, setValue] = useState("");

  //ユーザー情報
  const user = useContext(AuthContext);

  //firebaseが更新されるたび同期
  useEffect(() => {
    firebase
      .firestore()
      .collection("messages")
      .orderBy("dates")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setMessages(messages);
      });
  }, []);

  //firebaseにcontentをadd
  const handleSubmit = (e) => {
    e.preventDefault();
    //未入力時のアラート
    if (value === '') {
      return alert('未入力です');
    }
    firebase
      .firestore()
      .collection("messages")
      .add({
        content: value,
        user: user.displayName,
        dates: String(new Date()),
      });
      //入力後に初期化
      setValue('')
  };

  return (
    <>
      <Header />
      <MessageWrap>
        <MessageRow>
        <h1>Caht APP</h1>
          <ul>
            {messages ? (
              messages.map((message) => (
                <li>
                  <User>
                    <img src="https://placehold.jp/80x80.png" />
                    <p>{message.user}</p>
                  </User>
                  <Content>{message.content}</Content>
                </li>
              ))
            ) : (
              <p>...loading</p>
            )}
          </ul>
        </MessageRow>
      </MessageWrap>
      <FormWrap>
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            type="submit"
          >
          </Button>
        </Form>
      </FormWrap>
      <Navigation />
    </>
  );
};

export default Chat;

//スタイル
const MessageWrap = styled.div`
  padding: 30px 0 0 0;
  overflow: scroll;
  background-image: url("https://corriente.top/wp-content/uploads/2016/06/ios10-wallpaper.jpg");
  height: 100vh;
`;

const MessageRow = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 50px 0 0 0;
  height: 80vh;
  ul {
    margin-left: 0;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      // background: #303f9e;
      margin-bottom: 50px;
      color: #fff;
      padding: 10px;
      border-radius: 10px;
      div {
        position: relative;
        z-index:0;
        p {
          position: absolute;
          top:0;
          left: 60px;
        }
        + P {
          position: relative;
          top:25px;
          left: 0;
          width: 100%;
          min-height: 40px;
          word-break: break-all;
          padding 10px;
          background-color: #fff;
          border-radius: 15px;
          color: #000;
          &:before  {
            content: "";
            position: absolute;
            top: 11%;
            left: -13px;
            margin-top: -15px;
            border: 9px solid transparent;
            border-right: 15px solid #fff;
            z-index: 0;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
`;

const User = styled.div`
  img {
    border-radius: 50%;
    width: 80%;
  }
  p {
    text-align: center;
  }
`;

const Content = styled.p`
  width: 70%;
  margin: 0 auto;
`;

const FormWrap = styled.div`
  position: fixed;
  bottom: 53px;
  width: 100%;
  background: #fff;
  boder-top: 1px solid #3e3e3e;
`;

const Form = styled.form`
  width: 40%;
  height: 100%;
  padding: 10px 0 12px 0;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
  }
  input {
    width: 80%;
    height: 45px;
    padding: 10px;
    font-size: 20px;
    border-radius: 24px;
    border: 1px solid #3e3e3e;    
  }
  button {
    min-width: 10% !important;
    font-size: 16px;
    height: 40px;
    @media (max-width: 768px) {
      // width: 25%;
    }
  }
`;
