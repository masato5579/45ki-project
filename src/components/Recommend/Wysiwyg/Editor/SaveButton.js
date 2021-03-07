import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";

const SaveButton = ({ onSave }) => {
  return (
    <Container>
      <Button
        onClick={onSave}
        variant="contained"
        color="secondary"
        startIcon={<AddToPhotosIcon />}
      >
        保存する
      </Button>
    </Container>
  );
};

export default SaveButton;

const Container = styled.div`
  text-align: right;
  Button {
    padding: "15px 50px";
  }
`;
