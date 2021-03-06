import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";

const EditorHead = ({ onTitleChange, toggleEditor }) => {
  return (
    <Container>
      <Field>
        <TextField
          onChange={onTitleChange}
          id="filled-uncontrolled"
          label="Title"
          variant="outlined"
        />
      </Field>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CancelIcon />}
        onClick={toggleEditor}
      >
        閉じる
      </Button>
    </Container>
  );
};

export default EditorHead;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  TextField {
    width: 50%;
  }
  Botton {
    @media (max-width: 768px) {
      width: 10%;
    }
  }
`;

const Field = styled.div`
  width: 60%;
  TextField {
    width: 100%;
    background: #fff;
  }
`;
