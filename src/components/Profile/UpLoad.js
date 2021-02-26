import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

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
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(100);
  const [useName, setUserName] = useState("");

  //画像が更新された時のイベント
  const handleImage = (event) => {
    const image = event.target.files[0];
    setImage(image);
    console.log(image);
    setError("");
  };

  // const handleName = (event) => {
  //   const name = event.target.
  // }

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
          setImageUrl(downloadURL);
          firebase
            .firestore()
            .collection("image")
            .add({
              url: downloadURL,
              user: user.displayName,
              dates: String(new Date()),
            });
        });
      }
    );
  };

  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("image")
      .orderBy("dates", "desc")
      .onSnapshot((snapshot) => {
        const userinfo = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setUserInfo(userinfo);
      });
  }, []);

  return (
    <div>
      <Header />
      <UploadWrap>
      <h1>upload</h1>
        {error && <div variant="danger">{error}</div>}
        <ImageBloclk>
          {userInfo ? (
              <img src={userInfo[0].url} alt="0番目の画像"/>
            ) : (
              <p>loading</p>
              
            )}
            
        </ImageBloclk>
        <form onSubmit={onSubmit}>
          <input type="file" onChange={handleImage} />
          <button onClick={onSubmit}>Upload</button>
        </form>
        {progress !== 100 && <LinearProgressWithLabel value={progress} />}
        {/* {imageUrl && (
          <div>
            <img src={imageUrl} alt="uploaded" />
          </div>
        )} */}
        {/* <div>
          {userInfo ? (
            userInfo.map((userinfo) => (
              <div>
                <p>{userinfo.user}</p>
                <img src={userinfo.url} style={{ width: "200px" }} />
              </div>
            ))
          ) : (
            <p>...loading</p>
          )}

        </div> */}
      {imageUrl && (
        <div>
          <img width="400px" src={imageUrl} alt="uploaded" />
        </div>
      )}
        
        
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
  padding: 80px 20px;
  margin: 0 auto;
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
`;