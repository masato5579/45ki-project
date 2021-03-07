import React, { useState, useEffect, useContext } from "react";
import firebase from "../../Firebase/firebase";
import { AuthContext } from "../../Route/AuthService";

import Header from "../common/Header";
import Navigation from "../common/Navigation";
import styled from 'styled-components';

import Form from './Form';
import List from './List';


const Todo = () => {

  const [todos, setTodos] = useState([])
  const [value, setValue] = useState('')

  const user = useContext(AuthContext);


  useEffect(() => {
    firebase
    .firestore()
    .collection("masaTodo")
    .orderBy("dates")
    .onSnapshot((snapshot) => {
      const todos = snapshot.docs.map(doc => {
        return {
          docid:doc.id,
          ...doc.data()
        }
      });
      setTodos(todos);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === '') {
      alert('入力値が空になっています！')
    } else {
      firebase
      .firestore()
      .collection("masaTodo")
      .add({
        content: value,
        user: user.displayName,
        dates: new Date(),
      });
    }
    setValue('')
  };

  const handleDelete = (docid) => {
    firebase
    .firestore()
    .collection("masaTodo")
    .doc(docid)
    .delete()
  };

  return (
    <div className="wapper">
      < Header />
        <Wapper>
          <Container>
            <h1>Todoの作成</h1>
            <List todos={todos} handleDelete={handleDelete}/>
          </Container>
          <FormWrap>
              <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
          </FormWrap>
        </Wapper>
      <Navigation />
    </div>
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
font-size: 40px;
width: 90%;
margin: 0 auto;
padding: 80px 0 0 0;
height: 80vh;
// overflow: scroll;
// padding-bottom: 200px;
}
`;