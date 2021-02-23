import React, { useState } from "react";
import firebase from "../Firebase/firebase";

import styled from "styled-components";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //firebaseにEmailとpasswordをpush nameも登録
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.updateProfile({
          displayName: name,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
     <LoginWarpper>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <InputlBlock>
          <input
            type="Name"
            id="Name"
            name="Name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </InputlBlock>
        <InputlBlock>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputlBlock>
        <InputlBlock>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
         </InputlBlock>
        <BTM type="submit">SignUp</BTM>
      </form>
      </LoginWarpper>
    </>
  );
};

export default SignUp;

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