import React, { useState} from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './components/model';
import { DragDropContext } from "react-beautiful-dnd"; 

// define react functional component
const App: React.FC = () => {
  // need to give state a type
  const [todo, setTodo] = useState<string>("");
  // array of a type Interface, initial value empty array
  const [todos, setTodos] = useState<Todo[]>([]);  // holds list of `Todo` defined in `model.ts`

  // completed todos
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
  }

  return (
    // wrap in Drag/Drop context, needs `onDragEnd` prop 
    <DragDropContext onDragEnd={() => {}}>  
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
