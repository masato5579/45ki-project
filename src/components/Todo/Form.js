import React from 'react'

import styled from "styled-components";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

const Form = ({ handleSubmit, value, setValue } ) => {

  return (
    <FormWrap>
    <FormA onSubmit={handleSubmit}>
      <input
        type='text'
        value={value}
        placeholder="Todoを作成"
        onChange={e => {
          setValue(e.target.value)
        }}
      />
      <Button
        className="MuiRestBtn"
        type='text'
        variant="contained"
        color="primary"        
        endIcon={<SendIcon />}
        onChange={e => {
          setValue(e.target.value)
        }}
      >
      </Button>      
    </FormA>
    </FormWrap>
  )
}


export default Form

const FormWrap = styled.div`
  position: fixed;
  bottom: 53px;
  width: 100%;
  height: 50px;
  background-color: rgba(0,0,0,0.8);
  boder-top: 1px solid #3e3e3e;
`;

const FormA = styled.form`
  width: 40%;
  height: 100%;
  padding: 10px 0 12px 0;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
  }
  input {
    width: 100%;
    height: 30px;
    padding: 0 10px;
    font-size: 16px;
    border-radius: 24px;
    border: 1px solid #3e3e3e;
  }
  button {
    min-width: 30px;
    height: 40px;
    background: none;
    padding: 0;
  }
`;