import React, { useRef } from 'react'
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
  // want background color to go back once user hits submit/enter, use hook `useRef`
  const inputRef = useRef<HTMLInputElement>(null); // add type HMTMLInputElement


  return (
    // when we click `Go` button to submit, handleAdd should fire off 
    // shifts focus from input box (blur)
    <form className="input" 
        onSubmit={(e) => {
        handleAdd(e)
        inputRef.current?.blur();    // take inputRef & perform blur function on inputObect
    }}>
      <input 
        ref={inputRef} // provide ref to our input 
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