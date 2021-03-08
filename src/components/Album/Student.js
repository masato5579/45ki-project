import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';



const Student = ({ albums, handleDelete }) => {
  return (
    <Container>
      <h2>卒業生のコメント</h2>
      <ul>
        {albums ? (
          albums.map((album) => (
            <Li>
              <User>
                <Image>
                  <img src={album.userimage} alt="userimage" />
                </Image>
                <p>{album.user}</p>
              </User>
              <div id="content_text">
                <h2>授業の感想</h2>
                <content>{album.content}</content>
              </div>
              <div id="content_text">
                <h2>今後の目標</h2>
                <content>{album.content2}</content>
              </div>
              <div class="deletebutton">
                <Button onClick={() => handleDelete(album.docid)}>削除</Button>
              </div>
            </Li>
          ))
        ) : (
          <p>...loading</p>
        )}
      </ul>
    </Container>
  );
};

export default Student;

const Container = styled.div`
// background-color: #FFCCFF;
h2 {
  font-size: 1.5em;
  font-weight: bold;
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
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 1em;
  box-shadow: 0 0 8px black;
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
} h2 {
  color: ;
  font-size: 20px;
  border-bottom: thin solid;
  align-items: center;
}
.deletebutton {
  text-align: right;
  align-items: flex-end;
}
`;

const Image = styled.div``;

const User = styled.div`
  text-align: center;
  color: ;
  img {
    background-size: cover;
    object-fit: cover;
    border-radius: 35px;
    width: 60px;
    height: 60px;
  }
`;
