import React, { useState } from "react";
import Header from "../common/Header";
import Navigation from "../common/Navigation";
import shortid from 'shortid';

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
        <div><h1>Todoの作成</h1></div>
        <Form addTodo={addTodo} />
        <List todos={todos} deleteTodo={deleteTodo} />
      <Navigation />
    </div>
  );
};

export default Todo;
