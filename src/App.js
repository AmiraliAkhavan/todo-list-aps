import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [todos, setTodos] = useState([
    { text: "Practice coding", id: 1 },
    { text: "Doing some exercise", id: 2 },
    { text: "Go shopping", id: 3 },
  ]);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [searchTerm, setSearchTerm] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditText(todo.text);
    setEditId(id);
  };

  useEffect(() => {
    const filtered = todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTodos(filtered);
  }, [todos, searchTerm]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: editText } : todo
        )
      );
      setEditId(null);
      setEditText("");
    } else {
      const newTodo = { text: e.target.add.value, id: Date.now() };
      setTodos([...todos, newTodo]);
      e.target.reset();
      setEditText("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
      <header className="text-center text-light my-4">
        <h1 className="mb-4">Todo List</h1>
        <form className="search">
          <input
            className="form-control m-auto"
            type="text"
            name="search"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
      </header>

      <ul className="list-group ul mx-auto text-light">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{todo.text}</span>
            <div>
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="delete"
                onClick={() => handleDeleteTodo(todo.id)}
              />
              <FontAwesomeIcon
                icon={faEdit}
                className="edit"
                onClick={() => handleEditTodo(todo.id)}
              />
            </div>
          </li>
        ))}
      </ul>

      <form className="add text-center my-4" onSubmit={handleAddTodo}>
        <label className="text-light">Add a new todo / Edit</label>
        <input
          className="form-control m-auto"
          type="text"
          name="add"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      </form>
    </div>
  );
}

export default App;
