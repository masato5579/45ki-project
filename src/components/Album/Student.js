import React from 'react';
import styled from 'styled-components';



const Student = ({albums, handleDelete}) => {

  return (
    <Container>
      <h1>卒業生のコメント</h1>
      <ul>
      {albums ? (
        albums.map((album) => (
          <Li>
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
            <div class='deletebutton'>
              <button onClick={()=>handleDelete(album.docid)}>削除</button>
            </div>
          </Li>
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
// background-color: #FFCCFF;
h1 {
  font-size: 1.5em;
  text-align: center;
  padding: 6% 3% 0% 3%;
}
ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 3%;
}`;

const Li = styled.div`
  width: 30%;
  margin: 10px;
  padding: 1%;
  background-color: #dc8ba7;
  border-radius: 1em;
  text-align: center;
  content {
    width: 100%;
    color: ;
  }
  @media (max-width: 768px) {
    width: 45%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
}
#content_text {
  margin: 10px 0;
} h1 {
  font-size: 20px;
  border-bottom: thin solid;
  align-items: center;
}
.deletebutton {
  text-align: right;
  align-items: flex-end;
}
`;

const User = styled.div`
  text-align: center;
  img {
    border-radius: 3em;
  }
`;