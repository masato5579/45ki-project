import React, {useState} from 'react'

import styled from "styled-components";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

const Form = ({ addTodo } ) => {
  const [value, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (value === '') {
      alert('入力値が空になっています！')
    } else {
      addTodo(value)
    }
    setValue('')
  }

  return (
    <FormWrap>
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={value}
        placeholder="Todoを作成"
        onChange={e => {
          setValue(e.target.value)
        }}
      />
      <Button
        type='text'
        variant="contained"
        color="primary"        
        endIcon={<SendIcon />}
        onChange={e => {
          setValue(e.target.value)
        }}
      >
      </Button>      
    </form>
    </FormWrap>
  )
}


export default Form

const FormWrap = styled.div`
  position: fixed;
  bottom: 53px;
  width: 100%;
  background: #fff;
  boder-top: 1px solid #3e3e3e;
  form {
    width: 90%;
    padding: 10px 0 12px 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;

  }
  input {
    width: 80%;
    height: 45px;
    padding: 10px;
    font-size: 20px;
    border-radius: 24px;
    border: 1px solid #3e3e3e;
  }
  button {
    min-width: 10% !important;
    font-size: 16px;
    min-width: 60px;
    @media (max-width: 768px) {
      // width: 25%;
    }
  }  

`;
