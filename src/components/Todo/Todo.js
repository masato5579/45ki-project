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
    <div className="wapper">
      <Header />
        <Container>
          <div><h1>Todoの作成</h1></div>
          <Form addTodo={addTodo} />
          <List todos={todos} deleteTodo={deleteTodo} />
        </Container>
      <Navigation />
    </div>
  );
};

export default Todo;

//スタイル
const Container = styled.div`
font-size: 40px;
padding-top: 60px;
h1 {
  padding: 10px;
}
form {
  text-align: center;
  input {
    width: 300px;
    height: 50px;
    font-size: 1em;
    margin: 10px 0;
    border: 3px solid black;
    border-radius: 0.1em;
  }
}
`;