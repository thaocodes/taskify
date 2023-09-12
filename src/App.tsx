import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './components/model';
import { DragDropContext, DropResult } from "react-beautiful-dnd"; 

// define react functional component
const App: React.FC = () => {
  // need to give state a type
  const [todo, setTodo] = useState<string>("");
  // array of a type Interface, initial value empty array
  const [todos, setTodos] = useState<Todo[]>([]);  // holds list of `Todo` defined in `model.ts`
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  //===  Add todo  ====//
  const handleAdd = (e: React.FormEvent) => {    // e needs a type, add this in Props too
    e.preventDefault();

    if (todo) { // if theres something inside the todo
      // take everything already inside todos & add new todo
      // todo : todo can be written as just `todo`
      setTodos([...todos,{ id: Date.now(), todo, isDone: false }]) // properties for Todo
      // reset input field after a `todo` is added
      setTodo("");
    }
  };

  // save state for a dragged todo 
  // sends result parameter of type DropResult
  const onDragEnd = (result: DropResult) => {
    console.log(result); // gives us source & destination fields

    // destructure fields from result
    const { source, destination } = result;

    // if destination is null, do nothing (dragging to an undroppable zone)
    if (!destination) {
      return;
    };

    // if source & destination are the same & in the same index, do nothing (dragging in same zone)
    if (
      destination.droppableId === source.droppableId && 
      destination.index === source.index
    ) {
      return;
    }
    
    // declare variables 
    let add; 
    let active = todos; // all todos in the todos state
    let complete = completedTodos;    // all completed todos 

    // Source logic
    // take the particular todo from its source, get it's index & remove it from source
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      // remove 1 item using splice to manipulate array
      active.splice(source.index, 1);   
    
    // if it came from completed tasks ("TodosRemove"), we remove it from there
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination logic
    // ADD that todo to its destination
    if (destination.droppableId === "TodosList") {
      // get it's index & ADD it to this array
      active.splice(destination.index, 0, add);   // 0 bc not removing anything, add = array
    
    } else {
      complete.splice(destination.index, 0, add);
    }

  // manipulated active & complete variables
  // add it to our state
  setCompletedTodos(complete);
  setTodos(active);
  };


  return (
    // wrap in Drag/Drop context, needs `onDragEnd` prop 
    <DragDropContext onDragEnd={onDragEnd}>  
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField 
          todo={todo} 
          setTodo={setTodo} 
          handleAdd={handleAdd} 
        />
        <TodoList 
          todos={todos} 
          setTodos={setTodos} 
          completedTodos={completedTodos} 
          setCompletedTodos={setCompletedTodos} 
        />
      </div>
    </DragDropContext>
  );
}

export default App;
