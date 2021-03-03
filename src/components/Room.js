import "../scss/App.scss";
import styled from "styled-components";

import Header from "./common/Header";
import Navigation from "./common/Navigation";

import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";


function Room() {
  return (
    //React.Fragment
    <>
      <RoomWarpper>
        <Header />
        <ContentWarpper>
          <p className="designHeadding">45TH TERM-APP</p>
          <a className="scroll"href="#"><span></span>Please Tap</a>
          </ContentWarpper>
        <Navigation />
      </RoomWarpper>
    </>
  );
}

export default Room;

const RoomWarpper = styled.div`
  background-image: url("https://images.alphacoders.com/291/thumb-1920-291093.jpg");
  background-repeat: repeat-y;
  height: 100vh;
  p  {
    padding : 50% 10px;
    font-size: 2.5rem;
    color: #000;
    text-align: center;
  }
  .scroll {
    padding-top: 50px;
    text-align: center;
    display: block;
    font-size: 15px;
    font-weight: bold;
    span {
      position: absolute;
      bottom: 130px;
      left: 50%;
      width: 24px;
      height: 24px;
      margin-left: -12px;
      border-left: 5px solid #000;
      border-bottom: 5px solid #000;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      -webkit-animation: sdb 2s infinite;
      animation: sdb 2s infinite;
      box-sizing: border-box;
    }
  }
  @-webkit-keyframes sdb {
    0% {
      -webkit-transform: rotate(-45deg) translate(0, 0);
    }
    20% {
      -webkit-transform: rotate(-45deg) translate(-10px, 10px);
    }
    40% {
      -webkit-transform: rotate(-45deg) translate(0, 0);
    }
  }
  @keyframes sdb {
    0% {
      transform: rotate(-45deg) translate(0, 0);
    }
    20% {
      transform: rotate(-45deg) translate(-10px, 10px);
    }
    40% {
      transform: rotate(-45deg) translate(0, 0);
    }
  }
`;
const ContentWarpper = styled.div`
  padding: 50% 5%;
  color: #000;
  background-color: rgba(255,255,255,0.5);
  height: 100vh;
`;