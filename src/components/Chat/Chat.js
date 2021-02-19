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
    firebase
      .firestore()
      .collection("messages")
      .add({
        content: value,
        user: user.displayName,
        dates: String(new Date()),
      });
  };

  return (
    <>
      <Header />
      <MessageWrap>
        <MessageRow>
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
            送信
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
  margin-bottom: 10px;
`;

const MessageRow = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 50px 0 0 0;
  height: 80vh;
  ul {
    li {
      width: 100%;
      display: flex;
      align-items: center;
      background: #303f9e;
      margin-bottom: 10px;
      color: #fff;
      padding: 10px;
      border-radius: 10px;
    }
  }
`;

const User = styled.div`
  img {
    border-radius: 50%;
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
  background: #666666;
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
    width: 75%;
    height: 50px;
    font-size: 20px;
  }
  button {
    height: 63%;
    width: 20%;
    font-size: 16px;
    min-width: 90px;
    @media (max-width: 768px) {
      width: 25%;
    }
  }
`;
