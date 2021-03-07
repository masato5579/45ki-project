import React from 'react'
import Item from './Item'


const List = ({ todos, handleDelete, }) => {
  return (
    <ul>
      {
        todos.map(todo => {
          return (
            <Item
              content={todo.content}
              todo={todo}
              handleDelete={handleDelete}
            />
          )
        })
      }
    </ul>
  )
}


export default List