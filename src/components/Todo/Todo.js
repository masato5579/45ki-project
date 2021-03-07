import React, { useState } from "react";
import Header from "../common/Header";
import Navigation from "../common/Navigation";
import shortid from 'shortid';
import styled from 'styled-components';

import Form from './Form';
import List from './List';


const Todo = () => {

  const [todos, setTodos] = useState([])

  const addTodo = content => {
    setTodos([
      ...todos,
      {
        content: content,
        id: shortid.generate()
      }
    ])
  }

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <Wapper>
      <Header />
        <Container>
          <h1>Todoの作成</h1>
          <List todos={todos} deleteTodo={deleteTodo} />
        </Container>
        <FormWrap>
            <Form addTodo={addTodo} />
          </FormWrap>
      <Navigation />
    </Wapper>
  );
};

export default Todo;

//スタイル
const Wapper = styled.div`
  background-image: url("https://i.pinimg.com/originals/e6/6d/13/e66d13001800b7c06a1c5fb9080a0e1a.jpg");
  height: 100vh;
`;

const FormWrap = styled.div`
  background: #fff;
  boder-top: 1px solid #3e3e3e;
`;

const Container = styled.div`
margin: 0 auto;
padding: 80px 10px 0;
background-color: rgba(128,128,128,0.5);
height: 100vh;
// background-color: red;




}
`;