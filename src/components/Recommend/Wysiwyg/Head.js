import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";

const Head = ({ toggleEditor }) => {
  return (
    <Container>
      <Title>おすすめ</Title>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddToPhotosIcon />}
        onClick={toggleEditor}
      >
        おすすめを追加
      </Button>
    </Container>
  );
};

export default Head;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
  Button {
    height: 65px;
  }
`;

const Title = styled.h1`
  padding: 10px;
  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
`;
