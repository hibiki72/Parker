import { trpc } from '../utils/trpc';
import { useState } from 'react';

export default function Home() {
  const [newTodo, setNewTodo] = useState('');
  const todos = trpc.getTodos.useQuery();
  const createTodo = trpc.createTodo.useMutation();
  const updateTodo = trpc.updateTodo.useMutation();
  const deleteTodo = trpc.deleteTodo.useMutation();

  const createTodoMutation = async () => {
    await createTodo.mutateAsync({ title: newTodo });
    todos.refetch();
  };

  const deleteTodoMutation = async (id: number) => {
    console.log(typeof id)
    await deleteTodo.mutateAsync({ id });
    todos.refetch();
  };

  const updateTodoMutation = async (id: number, completed: boolean) => {
    await updateTodo.mutateAsync({ id, completed });
    todos.refetch();
  };

  if (todos.isLoading) {
    return <div>Loading...</div>;
  }
  if (todos.error) {
    return <div>Error: {todos.error.message}</div>;
  }
  return (
    <div>
      {todos.data.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => updateTodoMutation(todo.id, e.target.checked)}
          />
          {todo.title}
          <button onClick={() => deleteTodoMutation(todo.id)}>Delete</button>
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTodoMutation();
          setNewTodo('');
        }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
