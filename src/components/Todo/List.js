import React from 'react'
import Item from './Item'
import styled from 'styled-components';


const List = ({ todos, deleteTodo }) => {
  return (
    <Wapper>
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
    </Wapper>
  )
}


export default List

const Wapper = styled.div`
  margin-left: 0;
`;