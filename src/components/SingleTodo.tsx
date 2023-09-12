import React, { useEffect, useRef, useState } from 'react';
import { Todo } from './model';
import { AiFillEdit, AiFillDelete  } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import "./styles.css";


type Props = {
    index: number;
    todo: Todo,    // what we defined in model.ts
    todos: Todo[],   // array of Todo
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
    // 2 states for `edit` 
    const [edit, setEdit] = useState<boolean>(false);   // keeps track if edit mode is on or not
    // keeps track of the value of edited `todo`
    // defaul value is the `todo` we want to edit
    const [editTodo, setEditTodo] = useState<string>(todo.todo); 

    // click on edit, focus automatically goes to inside of input box
    const inputRef = useRef<HTMLInputElement>(null);   // useRef hook
    // whenever edit changes, fires useEffect 
    useEffect(() => {
        inputRef.current?.focus(); // focus on input box
    }, [edit]);


    // === Marking Task Complete === //
    const handleDone = (id: number) => {
        setTodos(
            // map thru array, if todo.id matches id
            todos.map((todo) => 
            // take all properties of that `todo`, change .isDone propery & invert the value
                todo.id === id ? {...todo, isDone: !todo.isDone } : todo    // otherwise return todo
            )
        );
    };

    // === Delete a Task === //
    const handleDelete = (id: number) => {
        // if todo.id does not matches id, return it 
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // === Edit a Task === //
    // fires when edited task is submitted
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        // if todo.id matches the id sent by onSubmit
        // spread operator: copy all properties of Todo object but update `todo` property
        // (string) to be the edited todo
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
            // if id's DON't match, return todo
        );
        setEdit(false);     // reset edit state back to false
    };

    return (
        // make single todo draggable 
        // provide unique id (todo.id), index we get from TodoList to keep track of index
        <Draggable draggableId={todo.id.toString()} index={index}> 
            {/* add function, pass it provided */}
            {(provided, snapshot) => (
            //  submit event for editing task, takes event object & todo.id 
            <form // pass provided to parent element, provide props & ref
                className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} 
                onSubmit={(e) => handleEdit(e, todo.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
            {/* if edit mode is ON, then display input box */}
                {edit ? (
                    <input 
                        ref={inputRef}
                        value={editTodo}
                        // update the state of edited `todo` with what user inputs
                        onChange={(e) => setEditTodo(e.target.value)}
                        className="todos__single--text"
                    />
                // otherwise, display normal `todo`

                //  if todo is completed, strike it off 
                ) : todo.isDone ? (   
                    //  <s is a strike tag
                    <s className="todos__single--text">{todo.todo}</s>     
                ) : (
                    // otherwise, render normal `todo`
                    <span className="todos__single--text">{todo.todo}</span>
                )}
                    
                <div>
                    <span 
                        className="icon" 
                        // cannot edit task that is already marked Done
                        onClick={() => {
                        // if edit mode is NOT on/true (i.e edit is false) & todo is NOT done
                            if (!edit && !todo.isDone) {
                                // change `edit` to oppositie value (true)
                                setEdit(!edit);  // initial state of `edit` = false
                            }
                        }}
                    >
                    
                        <AiFillEdit />
                    </span>
                    <span className="icon" onClick={() => handleDelete(todo.id)}>
                        <AiFillDelete />
                    </span>
                    {/* fire off handleDone function & send it todo.id */}
                    <span className="icon" onClick={() => handleDone(todo.id)}>
                        <MdDone />
                    </span>
                </div>
            </form>
            )}
        </Draggable>
    )
}

export default SingleTodo;