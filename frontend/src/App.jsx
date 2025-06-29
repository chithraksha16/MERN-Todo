import './App.css'
import  { useEffect, useState } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo } from './Api.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (text.trim()) {
      await addTodo(text);
      setText('');
      loadTodos();
    }
  };

  const handleToggle = async (todo) => {
    await updateTodo(todo._id, { completed: !todo.completed });
    loadTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setEditText(todo.text);
  };

  const handleSaveEdit = async (id) => {
    await updateTodo(id, { text: editText });
    setEditId(null);
    setEditText('');
    loadTodos();
  };

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">📝 To-Do List</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between bg-white shadow rounded-lg px-4 py-2"
          >
            {editId === todo._id ? (
              <div className="flex flex-1 items-center gap-2">
                <input
                  className="flex-1 border border-gray-300 px-2 py-1 rounded"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  onClick={() => handleSaveEdit(todo._id)}
                  className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span
                  onClick={() => handleToggle(todo)}
                  className={`flex-1 cursor-pointer ${
                    todo.completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {todo.text}
                </span>
                <div className="flex gap-2 ml-4 ">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="text-yellow-600 hover:text-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
