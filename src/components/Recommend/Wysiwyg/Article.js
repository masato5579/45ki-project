import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";

const Article = ({ edit, open, deleteArticle }) => {
  return (
    <Container>
      {edit ? (
        edit.map((ed) => (
          <div className="article" style={{ display: open ? "none" : "block" }}>
            <h2 className="articleTitles">
              <AritcleHead>
                <div>Title</div>
                <Button
                  onClick={() => {
                    deleteArticle(ed.docid);
                  }}
                  variant="contained"
                  color="primary"
                  startIcon={<DeleteIcon />}
                >
                  この記事を削除
                </Button>
              </AritcleHead>
              <div className="articleTitle">{ed.title}</div>
            </h2>
            <div className="articleUpdatedate">更新日:{ed.dates}</div>
            <div dangerouslySetInnerHTML={{ __html: ed.content }}></div>
          </div>
        ))
      ) : (
        <CircularProgress color="primary" />
      )}
    </Container>
  );
};

export default Article;

const Container = styled.div`
  margin: 0;
  margin-top: 30px;
`;

const AritcleHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
