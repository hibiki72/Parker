import { trpc } from '../utils/trpc';
import { useState } from 'react';

// export default function IndexPage() {
//   const hello = trpc.hello.useQuery({ text: 'world' });

//   if (!hello.data) {  
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <p>{hello.data.greeting}</p>
//     </div>
//   );
// }


export default function Home() {
  const [newTodo, setNewTodo] = useState('');

  const todos = trpc.getTodos.useQuery();
  const createTodo = trpc.createTodo.useMutation();
  const updateTodo = trpc.updateTodo.useMutation();
  const deleteTodo = trpc.deleteTodo.useMutation();

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
            onChange={(e) =>
              updateTodo.mutate({ id: todo.id, completed: e.target.checked })
            }
          />
          {todo.title}
          {todo.id}
          <button onClick={() => deleteTodo.mutate(todo)}>Delete</button>
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTodo.mutate({ title: newTodo });
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
