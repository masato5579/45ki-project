import React from 'react';
import styled from 'styled-components';



const Student = ({albums, handleDelete}) => {

  return (
    <Container>
      <h1>卒業コメント sutudent.js</h1>
      <ul>
      {albums ? (
        albums.map((album) => (
          <li>
            <User>
              <img src="https://placehold.jp/80x80.png" />
              <p>{album.user}</p>
            </User>
            <div id="content_text">
              <h1>授業の感想</h1>
              <content>{album.content}</content>
            </div>
            <div id="content_text">
              <h1>今後の目標</h1>
              <content>{album.content2}</content>
            </div>
            <div>
              <button onClick={handleDelete}>削除</button>
            </div>
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
li {
  margin: 10px;
  background-color: #CC99FF;
}
#content_text {
  margin: 10px 0;
} h1 {
  font-size: 20px;
}
`;

const User = styled.div`
  
`;