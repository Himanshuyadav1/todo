import { createContext, useContext } from "react";

const TodoContext = createContext({
    todos: [],
    addTodo: (todoTitle) => {},
    toggleComplete: (id) => {},
    updateTodo: (id, todoTitle) => {},
    deleteTodo: (id) => {}
});

export const TodoContextProvider = TodoContext.Provider;

export const useTodo = () => {
    return useContext(TodoContext);
};