import React from "react";
import styled from "styled-components";

const Article = ({ edit, open }) => {
  return (
    <Container>
      {edit ? (
        edit.map((ed) => (
          <div className="article" style={{ display: open ? "none" : "block" }}>
            <h2 className="articleTitles">
              Title <div className="articleTitle">{ed.title}</div>
            </h2>
            <div className="articleUpdatedate">更新日:{ed.dates}</div>
            <div dangerouslySetInnerHTML={{ __html: ed.content }}></div>
          </div>
        ))
      ) : (
        <p>...loading</p>
      )}
    </Container>
  );
};

export default Article;

const Container = styled.div`
  margin: 0;
  margin-top: 30px;
`;
