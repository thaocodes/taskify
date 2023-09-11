import React from 'react'
import { Todo } from './model';
import "./styles.css";
import SingleTodo from './SingleTodo';

// define props from App
interface Props {
    todos: Todo[];  // todos is an array of `Todo`
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; // hover over `setTodos` in App 
}

// renders `todos`, need to bring it in from App
// ability to delete todos requries `setTodos` too
const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
    return (
        <div className="todos">
            {todos.map((todo) => (
                <SingleTodo 
                    todo={todo} 
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                />
            ))}
        </div>
    )
}

export default TodoList