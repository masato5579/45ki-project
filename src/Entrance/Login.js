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
      <h1>Login</h1>
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
        </InputlBlock>        
        <BTM type="submit">Login</BTM>
      </form>
      </LoginWarpper>
    </>
  );
};

export default Login;

const LoginWarpper = styled.div`
  padding: 30px 20px;
  overflow: scroll;
  margin: 100px 10px;
  border: 1px solid #3e3e3e;
  backgrouind: #000;
  border-radius: 10px;

`;

const InputlBlock = styled.div`
  padding-bottom: 20px;
  input {
    height: 40px; 
  }
`;

const BTM = styled.button`
  padding: 10px;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  display: block;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  border: none;
`;