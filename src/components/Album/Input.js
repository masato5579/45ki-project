import React, { useEffect, useState, useContext } from 'react';
import firebase from "../../Firebase/firebase";
import { AuthContext } from "../../Route/AuthService";
import styled from 'styled-components';

import Student from './Student';


const Input = () => {

  const [albums, setAlbums] = useState(null);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const user = useContext(AuthContext);


  useEffect(() => {
    firebase
      .firestore()
      .collection("albums")
      .orderBy("dates")
      .onSnapshot((snapshot) => {
        const albums = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setAlbums(albums);
      });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("albums")
      .add({
        content: value1,
        content2: value2,
        user: user.displayName,
        dates: new Date(),
      });
    console.log(value1)
    // console.log(value2)
  };


return (
  <>
  <InputDesign>
    <h1>入力インプット input.js</h1>
    <form onSubmit={handleSubmit}>
      <textarea name="textarea" value={value1} onChange={(e) => setValue1(e.target.value)} style={{width: '100%', height: '90px'}} placeholder="授業の感想"></textarea>
      <textarea name="textarea" value={value2} onChange={(e) => setValue2(e.target.value)} style={{width: '100%', height: '90px'}} placeholder="今後の目標"></textarea>
      <button type="submit">保存</button>
    </form>
  </InputDesign>
  <Student albums={albums}/>
  </>
)
};

export default Input;

const InputDesign = styled.div`
background-color: #CCFFCC;
form {
  width: 60%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }
}
button {
  width: 20%;
  margin: 10px 40%;
}
`;

