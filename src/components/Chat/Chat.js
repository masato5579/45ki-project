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
  const [userimage, setUserImage] = useState("");

  //ユーザー情報
  const user = useContext(AuthContext);

  //firebaseが更新されるたび同期
  useEffect(() => {
    firebase
      .firestore()
      .collection("messages")
      .orderBy("dates", "desc")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setMessages(messages);
      });
    firebase
      .firestore()
      .collection(user.displayName)
      .orderBy("dates", "desc")
      .onSnapshot((snapshot) => {
        const image = snapshot.docs.map((doc) => {
          return doc.data();
        });
        if (image.length === 0) {
          setUserImage("");
        } else {
          setUserImage(image[0].url);
        }
      });
  }, []);

  //firebaseにcontentをadd
  const handleSubmit = (e) => {
    e.preventDefault();
    //未入力時のアラート
    if (value === "") {
      return alert("未入力です");
    }
    firebase.firestore().collection("messages").add({
      content: value,
      user: user.displayName,
      image: userimage,
      dates: new Date(),
    });
    //入力後に初期化
    setValue("");
  };

  return (
    <>
      <Header />
      <MessageWrap>
        <MessageRow>
          <h1>Chat APP</h1>
          <ul>
            {messages ? (
              messages.map((message) => (
                <li>
                  <User>
                    <img src={message.image} alt="sample" />
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
            placeholder="メッセージを入力"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            className="MuiRestBtn"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            type="submit"
          ></Button>
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
  background-image: url("https://www.pakutaso.com/shared/img/thumb/MIYAZAKIDSC_2274_TP_V.jpg");
  oapcity: 0.5;
  height: 100vh;
`;

const MessageRow = styled.div`
  padding: 50px 10px 105px;
  background-color: rgba(128,128,128,0.5);
  ul {
    li {
      width: 100%;
      display: flex;
      align-items: center;
      // background: #303f9e;
      margin-bottom: 25px;
      color: #fff;
      padding: 10px;
      border-radius: 10px;
      div {
        position: relative;
        z-index:0;
        p {
          position: absolute;
          top:0;
          left: 70px;
          font-weight: bold;
        }
        + P {
          position: relative;
          top:15px;
          left: 8px;
          width: 100%;
          min-height: 40px;
          word-break: break-all;
          padding 10px;
          background-color: #fff;
          border-radius: 15px;
          font-size: 0.9rem;
          color: #000;
          box-shadow: 10px 10px 10px rgba(0,0,0,0.4);
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
    background-size: cover;
    object-fit: cover;
    border-radius: 35px;
    width: 60px;
    height: 60px;
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
  height: 50px;
  background-color: rgba(0, 0, 0, 0.8);
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
    width: 100%;
    height: 30px;
    padding: 0 10px;
    font-size: 16px;
    border-radius: 24px;
    border: 1px solid #3e3e3e;
  }
  button {
    min-width: 30px;
    height: 40px;
    background: none;
    padding: 0;
  }
`;
