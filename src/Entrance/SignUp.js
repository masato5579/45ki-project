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
     <p>SignUp</p>
      <form onSubmit={handleSubmit}>
        <InputlBlock>
          <input
            className="siginName"
            type="Name"
            id="Name"
            name="Name"
            placeholder="Input Name"
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
          <BTM type="submit">SignUp</BTM>
         </InputlBlock>
      </form>
      </LoginWarpper>
    </>
  );
};

export default SignUp;


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
  .siginName{
    color:#fff;
    font-size: 20px;
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