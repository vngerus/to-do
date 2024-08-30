import React, { useState } from "react";
import { TodoForm, TodoItem } from "./";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  status: "por hacer" | "en proceso" | "terminado" | "en pausa";
  color: string;
}

const getColorForStatus = (status: "por hacer" | "en proceso" | "terminado" | "en pausa"): string => {
  switch (status) {
    case "por hacer":
      return "bg-yellow-300";
    case "en proceso":
      return "bg-green-300";
    case "terminado":
      return "bg-red-300";
    case "en pausa":
      return "bg-blue-300";
    default:
      return "bg-gray-300";
  }
};

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string, status: Todo["status"]) => {
    const color = getColorForStatus(status);
    const newTodo: Todo = { id: Date.now(), text, completed: false, status, color };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id: number, newText: string, newStatus: Todo["status"]) => {
    const color = getColorForStatus(newStatus);
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText, status: newStatus, color } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const statuses: Todo["status"][] = ["por hacer", "en proceso", "terminado", "en pausa"];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="grid grid-cols-4 gap-4">
        {statuses.map((status) => (
          <div key={status} className={`p-4 rounded shadow ${getColorForStatus(status)}`}>
            <h2 className="text-xl font-semibold mb-2">{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
            <ul>
              {todos.filter(todo => todo.status === status).map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  updateTodo={updateTodo}
                  deleteTodo={deleteTodo}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;