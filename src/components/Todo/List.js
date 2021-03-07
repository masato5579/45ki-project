import React from 'react'
import Item from './Item'

import styled from "styled-components";

const List = ({ todos, deleteTodo }) => {
  return (
    <ItermWapper>
      {
        todos.map(todo => {
          return (
            <Item
              content={todo.content}
              id={todo.id}
              key={todo.id}
              deleteTodo={deleteTodo}
            />
          )
        })
      }
    </ItermWapper>
  )
}


export default List


const ItermWapper = styled.ul`
  overflow-y: scroll;
  height: 75%;
  padding: 5px 5px;
}
`;