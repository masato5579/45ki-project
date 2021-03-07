import React, { useState, useContext, useEffect } from "react";

import Header from "../common/Header";
import Navigation from "../common/Navigation";
import { storage } from "../../Firebase/firebase.js";
import firebase from "../../Firebase/firebase";
import { AuthContext } from "../../Route/AuthService";

import styled from "styled-components";

//design 用
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const UpLoad = () => {
  const [image, setImage] = useState("");

  const [error, setError] = useState("");
  const [progress, setProgress] = useState(100);

  //画像が更新された時のイベント
  const handleImage = (event) => {
    const image = event.target.files[0];
    setImage(image);
    console.log(image);
    setError("");
  };

  const user = useContext(AuthContext);
  const onSubmit = (event) => {
    //ブラウザデフォルトの挙動を止める
    event.preventDefault();
    //画像が選択されていない時の処理
    setError("");
    if (image === "") {
      console.log("ファイルが選択されていません");
      setError("ファイルが選択されていません");
      return;
    }

    // アップロード処理
    console.log("アップロード処理");
    //Firebase Storage の保存先とファイル名
    const storageRef = storage.ref("images");
    const imagesRef = storageRef.child(image.name); //ファイル名

    console.log("ファイルをアップする行為");
    const upLoadTask = imagesRef.put(image);
    console.log("タスク実行前");

    //upLoadTask 関数　でプログレスバーを表示
    upLoadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("snapshot", snapshot);
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent + "% done");
        setProgress(percent);
      },

      (error) => {
        console.log("err", error);
        setError("ファイルアップに失敗しました。" + error);
        setProgress(100); //実行中のバーを消す
      },

      () => {
        upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
          firebase.firestore().collection(user.displayName).add({
            url: downloadURL,
            user: user.displayName,
            dates: new Date(),
          });
        });
      }
    );
  };

  useEffect(() => {
    console.log(user.displayName);
    firebase
      .firestore()
      .collection(user.displayName)
      .orderBy("dates", "desc")
      .onSnapshot((snapshot) => {
        const userinfo = snapshot.docs.map((doc) => {
          return doc.data();
        });
        if (userinfo.length === 0) {
          setImage("");
        } else {
          setImage(userinfo[0].url);
        }
      });
  }, []);

  return (
    <div>
      <Header />
      <UploadWrap>
      <ContentWarpper>
        <h1>Image Upload</h1>
        {error && <div variant="danger">{error}</div>}
        <ImageBloclk>
          {image ? <img src={image} alt="0番目の画像" /> : <p>loading</p>}
          <div>
          <UserName>{user.displayName}</UserName>
        </div>
        </ImageBloclk>
        <form onSubmit={onSubmit}>
          <input type="file" onChange={handleImage} />
          <button onClick={onSubmit}>Upload</button>
        </form>
        {progress !== 100 && <LinearProgressWithLabel value={progress} />}
        </ContentWarpper>
      </UploadWrap>
      <Navigation />
    </div>
  );
};

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
export default UpLoad;
const UploadWrap = styled.div`

background-image: url("https://images.alphacoders.com/291/thumb-1920-291093.jpg");
background-position: 0 -250px;
background-repeat: repeat-y;
height: 100vh;
`;

const ContentWarpper = styled.div`
padding: 80px 10px ;
background-color: rgba(128,128,128,0.5);
height: 100vh;
  img {
    width: 100px;
    height: 100px;
    display: block;
    margin: 0 auto;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #3e3e3e;
  }
`;
const ImageBloclk = styled.div`
  display: block;
  margin-bottom: 50px;
`;
const UserName = styled.div`
text-align: center;
  margin: 20px;
`;