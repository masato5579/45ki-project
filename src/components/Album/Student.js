import React from 'react';
import styled from 'styled-components';


const Student = ({albums}) => {
  return (
    <Container>
      <h1>卒業コメント sutudent.js</h1>
      <ul>
      {albums ? (
        albums.map((album) => (
          <li>
            <user>
              <img src="https://placehold.jp/80x80.png" />
              <p>{album.user}</p>
            </user>
            <content>{album.content}</content>
            <content>{album.content2}</content>
          </li>
        ))
      ) : (
        <p>...loading</p>
      )}
    </ul>
    </Container>
  )
};

export default Student;

const Container = styled.div`
background-color: #FFCCFF;
`;