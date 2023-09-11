import React from 'react'
import { Todo } from './model';
import { AiFillEdit, AiFillDelete  } from "react-icons/ai";
import { MdDone } from "react-icons/md";


type Props = {
    todo: Todo,    // what we defined in model.ts
    todos: Todo[],   // array of Todo
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
    const handleDone = (id: number) => {
        
        setTodos(
            // map thru array, if todo.id matches id
            todos.map((todo) => 
            // take all properties of that `todo`, change .isDone propery & invert the value
                todo.id === id ? {...todo, isDone: !todo.isDone } : todo    // otherwise return todo
            )
        );
    };


    return (
        <div>
            <form className="todos__singe">
                {/* if todo is completed, strike it off */}
                {todo.isDone ? (
                    //  <s is a strike tag
                    <s className="todos__single--text">{todo.todo}</s>     
                ) : (
                    // otherwise, render normal `todo`
                    <span className="todos__single--text">{todo.todo}</span>
                )}
                
                <div>
                    <span className="icon">
                        <AiFillEdit />
                    </span>
                    <span className="icon">
                        <AiFillDelete />
                    </span>
                    {/* fire off handleDone function & send it todo.id */}
                    <span className="icon" onClick={() => handleDone(todo.id)}>
                        <MdDone />
                    </span>
                </div>
                { todo.todo }
            </form>

        </div>
    )
}

export default SingleTodo