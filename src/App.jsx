import { useEffect, useState } from 'react';
import './App.css';
import { TodoContextProvider } from './contexts';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
const [todos, setTodos] = useState([]);

const addTodo = todoTitle => {
  setTodos(prevTodos => [...prevTodos, { id: Date.now(), todoTitle, completed: false }]);
}

const toggleComplete = id => {
  setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo ));
}

const updateTodo = (id, todoTitle) => {
  setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? {...todo, todoTitle} : todo ));
}

const deleteTodo = id => {
  setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
}

useEffect(() => {
  //getting todos list from localStroage
  const todos = JSON.parse(localStorage.getItem("todos"));

  if(todos && todos.length > 0) setTodos(todos);

}, []);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  return (
    <TodoContextProvider value={{ todos, addTodo, toggleComplete, updateTodo, deleteTodo }}>
      <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                  {/* Todo form goes here */} 
                  <TodoForm />
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {/*Loop and Add TodoItem here */}
                  {todos.map(todo => (
                    <div key={todo.id} className='w-full'>
                      <TodoItem todo={todo}/>
                    </div>
                  ))}
              </div>
          </div>
      </div>
    </TodoContextProvider>
  )
}

export default App;
