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
    return (
        <div>
            <form className="todos__singe">
                <span className="todos__single--text"></span>
                <div>
                    <span className="icon">
                        <AiFillEdit />
                    </span>
                    <span className="icon">
                        <AiFillDelete />
                    </span>
                    <span className="icon">
                        <MdDone />
                    </span>
                </div>
                { todo.todo }
            </form>

        </div>
    )
}

export default SingleTodo