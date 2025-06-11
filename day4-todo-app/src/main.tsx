import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { STORAGE_KEY, type Todo } from './type'
import { v4 as uuidv4 } from 'uuid';


export const App = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const handleSubmit = (newTask: string) => {
    if (newTask.trim() === '') return; // 空のタスクは追加しない
    const newTodo: Todo = { id: uuidv4(), content: newTask };
    setTodos([...todos, newTodo]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...todos, newTodo]));
  };

  const handleDelete = (id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
  }

  // 🔹 初回読み込み時にlocalStorageから復元
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse todos from localStorage', e);
      }
    }
  }, []);
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Todo List</h1>
      <TodoForm onSubmit={handleSubmit} />
      <TodoList todos={todos} onDelete={handleDelete} />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)