import React, {useState} from 'react';
import Header from "../common/Header";
import Navigation from "../common/Navigation";
import styled from 'styled-components';

import Student from './Student';
import Input from './Input';
import { SettingsPhoneRounded } from '@material-ui/icons';

const Album = () => {

  let form_Button = document.getElementById("form-button");
  let input_form = document.getElementById("input");

  const handleClick = e => {
    form_Button ++;
    if ((form_Button % 2) !== 0) {
      console.log("奇数の処理")
      setDp("none");
    } else {
      console.log("偶数の処理")
      setDp("block");
    }
  }

  const [dp, setDp] = useState("none");

  return (
    <div className="wapper">
      <Header />
        <Layout>
          <div class="top">
            <h1>卒業アルバム album.js</h1>
            <button id="form-button" onClick={handleClick}>追加</button>
          </div>
          <div style={{display: dp}}>
            <Input id="input" />
          </div>
        </Layout>
      <Navigation />
    </div>
  );
};

export default Album;

const Layout = styled.div`
margin: 0 10px;
padding-top: 65px;
background-color: #CCFFFF;
.top {
  display: flex;
  justify-content:space-between;
  font-size: 20px;
}
`;