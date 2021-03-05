import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const Item = ({ content, id, deleteTodo }) => {
  const [isDone, setIsDone] = useState(false)

  const handleDelete = () => {
    deleteTodo(id)
  }

  return (
    <Itemdesign>
      <li>
          <input type='checkbox' onChange={() => {
            setIsDone(!isDone)
          }}/>
          <span style={
            {textDecoration: isDone ? 'line-through' : 'none'}
          }>{content}</span>
          <Button onClick={handleDelete}
            color="secondary"
            startIcon={<DeleteIcon />}
          ></Button>
      </li>
    </Itemdesign>
  )
}

export default Item

//スタイル
const Itemdesign = styled.div`
  li {
    background : #fff;
    padding: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;    
    border-radius: 0.1em;
    box-shadow:5px 5px 10px;
    border:0px solid #000;

    input {
      transform: scale(2);
      margin: auto 10px;
      width: auto;
    }
    span {
      width: 100%;
      font-size: 20px;
      margin: auto 10px;
      word-break: break-all;
    }
    button {
      height: 40px;
    }
  }
`;