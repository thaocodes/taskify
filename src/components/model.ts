import { useReducer } from "react";

export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
}


// ===  REFACTOR APP BY INTEGRATING USE REDUCER HOOK INSIDE  === //

// =====  useReducer hook   ===== //

// create type for Actions
// each action has a type & payload 
type Actions = 
    | { type: "add", payload: string }    // payload = string we send from input box 
    | { type: "remove", payload: number } // payload sends id 
    | { type: "done", payload: number  };  // payload sends id 

// reducer takes a state & actions. NEED to provide TYPES to state & actions 
// state = array of todos
// actions = add, remove, done 
const TodoReducer = (state: Todo[], action:Actions) => {
    // switch case
    switch (action.type) {
        case "add":
            return [
                ...state,
                { id: Date.now(), todo: action.payload, isDone: false },
            ];
        case "remove": 
            return state.filter((todo) => todo.id !== action.payload);
        case "done":
            return state.map((todo) => 
            todo.id !== action.payload ? {...todo, isDone: !todo.isDone }: todo);
        default:
            return state;
    }
}


// useReducer: provide it initial value (reducer) returns a state & dispatch
const ReducerExample = () => {
    const [state, dispatch] = useReducer(TodoReducer, [])

    return (
        <div/>
    )
}