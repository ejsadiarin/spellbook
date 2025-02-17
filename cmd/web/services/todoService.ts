export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface APIError {
    message: string;
}

export const todoService = {
    async getAllTodos(): Promise<Todo[]> {
        try {
            const response = await fetch('/api/todos');
            if (!response.ok) {
                const error: APIError = await response.json();
                throw new Error(error.message || 'Failed to fetch todos');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching todos:', error);
            throw error;
        }
    },

    async createTodo(title: string): Promise<Todo> {
        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            if (!response.ok) {
                const error: APIError = await response.json();
                throw new Error(error.message || 'Failed to create todo');
            }
            return response.json();
        } catch (error) {
            console.error('Error creating todo:', error);
            throw error;
        }
    },

    async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });
            if (!response.ok) {
                const error: APIError = await response.json();
                throw new Error(error.message || 'Failed to update todo');
            }
            return response.json();
        } catch (error) {
            console.error('Error updating todo:', error);
            throw error;
        }
    },

    async deleteTodo(id: number): Promise<void> {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const error: APIError = await response.json();
                throw new Error(error.message || 'Failed to delete todo');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
            throw error;
        }
    },
};
