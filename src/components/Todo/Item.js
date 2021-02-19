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
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >Delete</Button>
      </li>
    </Itemdesign>
  )
}

export default Item

//スタイル
const Itemdesign = styled.div`
  background-color: white;
  li {
    background-color: #dbedf0;
    margin: 10px 20%;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    border-radius: 0.1em;
    box-shadow:5px 5px 10px;
    border:0px solid #000;

    input {
      transform: scale(2);
      margin: auto 10px;
    }
    span {
      font-size: 30px;
      // color: green;
      margin: auto 10px;
      word-break: break-all;
    }
    button {
      
    }
  }
`;