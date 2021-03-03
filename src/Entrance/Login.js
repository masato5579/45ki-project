import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../Firebase/firebase";
import { AuthContext } from "../Route/AuthService";

import styled from "styled-components";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //firebaseにemailとpassword あったらログイン
  const handleSuibmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //ユーザー情報
  const user = useContext(AuthContext);

  //usetがあったら自動的にリダイレクト
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <LoginWarpper>
      <p>Login Your Acount</p>
      <form onSubmit={handleSuibmit}>
        <InputlBlock>
          <input 
            type="email"
            id="e-mail"
            name="e-mail"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </InputlBlock>
        <InputlBlock>
          <input 
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        <BTM type="submit">Login</BTM>
        </InputlBlock>        

      </form>
      </LoginWarpper>
    </>
  );
};

export default Login;

const LoginWarpper = styled.div`
  background-image: url("http://gahag.net/img/201511/12s/gahag-0024665000-1.jpg");
  background-repeat: repeat-y;
  height: 100vh;
  p  {
    padding : 90px 10px;
    font-size: 2.5rem;
    color: #fff;
    text-align: center;
  }
`;

const InputlBlock = styled.div`
  margin: 0 10px;
  padding-bottom: 20px;
  input {
    height: 50px;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: transparent; /* 透過 */
    color: #000000; /* 表示する文字色 */
  }
`;

const BTM = styled.button`
  width: 100%;
  margin-top: 50px;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  height: 50px;
  border: 1px solid #333;
`;