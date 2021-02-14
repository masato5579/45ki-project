import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../Firebase/firebase";
import { AuthContext } from "../Route/AuthService";

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
      <h1>Login</h1>
      <form onSubmit={handleSuibmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="e-mail"
            name="e-mail"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
