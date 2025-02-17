'use client';

import { useState, useEffect } from 'react';
import { todoService, Todo } from '../services/todoService';

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');

    useEffect(() => {
        loadTodos();
    }, []);

    async function loadTodos() {
        try {
            const fetchedTodos = await todoService.getAllTodos();
            setTodos(fetchedTodos);
        } catch (error) {
            console.error('Failed to load todos:', error);
        }
    }

    async function handleAddTodo(e: React.FormEvent) {
        e.preventDefault();
        try {
            const newTodo = await todoService.createTodo(newTodoTitle);
            setTodos([...todos, newTodo]);
            setNewTodoTitle('');
        } catch (error) {
            console.error('Failed to add todo:', error);
        }
    }

    async function handleToggleTodo(id: number, completed: boolean) {
        try {
            await todoService.updateTodo(id, { completed });
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, completed } : todo
            ));
        } catch (error) {
            console.error('Failed to toggle todo:', error);
        }
    }

    async function handleDeleteTodo(id: number) {
        try {
            await todoService.deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <form onSubmit={handleAddTodo} className="mb-4">
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    placeholder="Add a new todo"
                    className="border p-2 rounded w-full"
                />
            </form>

            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li key={todo.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={(e) => handleToggleTodo(todo.id, e.target.checked)}
                        />
                        <span className={todo.completed ? 'line-through' : ''}>
                            {todo.title}
                        </span>
                        <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="ml-auto text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
