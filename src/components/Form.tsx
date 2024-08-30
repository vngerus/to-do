import React, { useState } from "react";

interface TodoFormProps {
    addTodo: (text: string, status: "por hacer" | "en proceso" | "terminado" | "en pausa") => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [text, setText] = useState("");
    const [status, setStatus] = useState<"por hacer" | "en proceso" | "terminado" | "en pausa">("por hacer");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text, status);
            setText("");
            setStatus("por hacer");
        }
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
        <form onSubmit={handleSubmit} className="flex items-center mb-4 space-x-2">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Añadir tarea"
                className="p-2 border rounded w-1/2"
            />
            <div className={`flex items-center rounded w-1/4 overflow-hidden ${getStatusColor(status)}`}>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "por hacer" | "en proceso" | "terminado" | "en pausa")}
                    className={`w-full p-2 bg-transparent focus:outline-none ${getStatusColor(status)}`}
                >
                    <option value="por hacer" className="bg-yellow-300 text-yellow-800">Por hacer</option>
                    <option value="en proceso" className="bg-green-300 text-green-800">En proceso</option>
                    <option value="terminado" className="bg-red-300 text-red-800">Terminado</option>
                    <option value="en pausa" className="bg-blue-300 text-blue-800">En pausa</option>
                </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-1/6">
                Add
            </button>
        </form>
    );
};

export default TodoForm;
