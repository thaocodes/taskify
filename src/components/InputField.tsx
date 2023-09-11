import React from 'react'
import './styles.css';

// define types for props we get from App
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;  // function, hover over setTodo in App 
  handleAdd: (e: React.FormEvent) => void; // function that returns nothing
}

// need to provide type Props here (either way works)
// const InputField = ({ todo, setTodo }: Props) => {
const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  return (
    // when we click `Go` button to submit, handleAdd should fire off 
    <form className="input" onSubmit={handleAdd}>
      <input 
        type="input" 
        placeholder="Enter a task" 
        className="input__box" 
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input_submit" type="submit">
        Go 
      </button>

    </form>
    
  
  )
}

export default InputField