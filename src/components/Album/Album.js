import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../Route/AuthService";
import firebase from "../../Firebase/firebase";
import Header from "../common/Header";
import Navigation from "../common/Navigation";

import { SettingsPhoneRounded } from '@material-ui/icons';

import styled from 'styled-components';
import Student from './Student';



const Album = () => {

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
    setValue1("")
    setValue2("")
    setDp("none")
  };

  const handleClick = e => {
    setDp("block")
  }

  const close = e => {
    setDp("none")
  }
  
  const [dp, setDp] = useState("none");

  const handleDelete = () => {
    firebase
    .firestore()
    .collection("albums")
    .doc()
    .delete()
    console.log("削除機能")
  };

  return (
    <div className="wapper">
      <Header />
      <Layout>
        <AlbumDesign>
          <div class="top">
            <h1>卒業アルバム album.js</h1>
            <button id="form-button" onClick={handleClick}>追加</button>
            <button onClick={close}>閉じる</button>
          </div>
        </AlbumDesign>
        <div style={{display: dp}}>
          <InputDesign>
            <h1>入力インプット input.js</h1>
            <form onSubmit={handleSubmit}>
              <textarea name="textarea" value={value1} onChange={(e) => setValue1(e.target.value)} style={{width: '100%', height: '90px'}} placeholder="授業の感想"></textarea>
              <textarea name="textarea" value={value2} onChange={(e) => setValue2(e.target.value)} style={{width: '100%', height: '90px'}} placeholder="今後の目標"></textarea>
              <button type="submit">保存</button>
            </form>
          </InputDesign>
        </div>
          <Student albums={albums} handleDelete={handleDelete}/>
      </Layout>
      <Navigation />
    </div>
  );
};

export default Album;

const Layout = styled.div`
  padding-top: 80px;
`;

const AlbumDesign = styled.div`
margin: 0 10px;
// padding-top: 65px;
background-color: #CCFFFF;
.top {
  display: flex;
  justify-content:space-between;
  font-size: 20px;
}
`;

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
