import React from 'react'
import { Todo } from './model';
import "./styles.css";
import SingleTodo from './SingleTodo';
import { Droppable } from "react-beautiful-dnd";

// define props from App
interface Props {
    todos: Todo[];  // todos is an array of `Todo` objects
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; // hover over `setTodos` in App 
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>; // hover in App 
}

// renders `todos`, need to bring it in from App
// ability to delete todos requries `setTodos` too
const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    return (
        // active tasks 
        <div className="container">
            {/* wrap in Droppable, requires id to identify drop zone uniquely 
                and pass it a callback  */}
            <Droppable droppableId="TodosList">
                {/* callback function takes params (provided, snapshot) */}
                {(provided, snapshot) => (    // takes provided & gives it to parent <div> of this droppable zone
                    // need to provide ref to parent zone
                    // spread provided.droppableProps
                    <div 
                        // highlights zone that dragged item is hovering over
                        // if item is dragging over, provide it className `dragactive` otherwise don't provide a className
                        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} 
                        ref={provided.innerRef} {...provided.droppableProps}
                    >
                        <span className="todos__heading">Active Tasks</span>
                        {/*  take todos state being passed from App & render all todos */}
                        {todos?.map((todo, index) => (
                            // need to send index bc this will track which `todo` is being dragged
                            <SingleTodo    
                                index={index}
                                todo={todo}
                                todos={todos}
                                key={todo.id}
                                setTodos={setTodos}
                            />
                        ))} 
                        {/* provide space when dragging todo so it can be dropped */}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {/*  completed tasks  */}
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div 
                        className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : "remove"}`}
                        ref={provided.innerRef} {...provided.droppableProps}
                    >
                        <span className="todos__heading">Completed Tasks</span>
                        {/*  take todos state being passed from App & render all completed todos */}
                        {completedTodos.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todo={todo}
                                todos={completedTodos}
                                key={todo.id}
                                setTodos={setCompletedTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TodoList;


