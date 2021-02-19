import React, {useState} from 'react'


const Form = ({ addTodo } ) => {
  const [value, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (value === '') {
      alert('入力値が空になっています！')
    } else {
      addTodo(value)
    }
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={value}
        placeholder="Todoを作成"
        onChange={e => {
          setValue(e.target.value)
        }}
      />
    </form>
  )
}


export default Form