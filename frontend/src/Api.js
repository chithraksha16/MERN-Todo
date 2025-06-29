import axios from "axios";

const API=axios.create({ baseURL: 'http://localhost:4000/api/todos' })

export const getTodos = () => API.get('/');
export const addTodo = (text) => API.post('/', { text });
export const updateTodo = (id, data) => API.put(`/${id}`, data);
export const deleteTodo = (id) => API.delete(`/${id}`);