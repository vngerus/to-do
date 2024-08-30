import React, { useState } from "react";

interface TodoItemProps {
    todo: {
        id: number;
        text: string;
        completed: boolean;
        status: "por hacer" | "en proceso" | "terminado" | "en pausa";
        color: string;
    };
    toggleTodo: (id: number) => void;
    updateTodo: (id: number, newText: string, newStatus: "por hacer" | "en proceso" | "terminado" | "en pausa") => void;
    deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, updateTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);
    const [newStatus, setNewStatus] = useState(todo.status);

    const handleEdit = () => {
        updateTodo(todo.id, newText, newStatus);
        setIsEditing(false);
    };

    const getStatusColor = (status: "por hacer" | "en proceso" | "terminado" | "en pausa") => {
        switch (status) {
            case "por hacer":
                return "bg-yellow-300 text-yellow-800";
            case "en proceso":
                return "bg-green-300 text-green-800";
            case "terminado":
                return "bg-red-300 text-red-800";
            case "en pausa":
                return "bg-blue-300 text-blue-800";
            default:
                return "bg-gray-300 text-gray-800";
        }
    };

    return (
        <li className={`flex justify-between items-center p-2 rounded mt-2 ${getStatusColor(todo.status)}`}>
            {isEditing ? (
                <div className="flex flex-col">
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="p-1 mb-2 border rounded"
                    />
                    <div className={`flex items-center rounded overflow-hidden ${getStatusColor(newStatus)}`}>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value as "por hacer" | "en proceso" | "terminado" | "en pausa")}
                            className="w-full p-1 bg-transparent focus:outline-none"
                        >
                            <option value="por hacer" className="bg-yellow-300 text-yellow-800">Por hacer</option>
                            <option value="en proceso" className="bg-green-300 text-green-800">En proceso</option>
                            <option value="terminado" className="bg-red-300 text-red-800">Terminado</option>
                            <option value="en pausa" className="bg-blue-300 text-blue-800">En pausa</option>
                        </select>
                    </div>
                    <button onClick={handleEdit} className="mt-2 bg-green-500 text-white p-1 rounded">Guardar</button>
                </div>
            ) : (
                <>
                    <span
                        onClick={() => toggleTodo(todo.id)}
                        className={`cursor-pointer ${todo.completed ? "line-through" : ""}`}
                    >
                        {todo.text}
                    </span>
                    <div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            X
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;
