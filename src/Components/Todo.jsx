import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { addTodos, deleteTodos, getTodos, toggleTodos } from "../api/todo";
import { AddTodo } from "./AddTodo";
import Pagination from "./Pagination";
import { TodoList } from "./TodoList";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [titleSortBy, setTitleSortBy] = useState("ASC");
  const [page, setPage] = useState(1);

  useEffect(() => {
    handleGetTodos();
  }, [titleSortBy,page ]);

  const handleGetTodos = () => {
    setLoading(true);
    getTodos({ titleSortBy, page })
      .then((res) => {
        setTodos(res);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleAdd = (text) => {
    const item = {
      title: text,
      status: false,
    };
    setLoading(true);
    addTodos(item)
      .then((res) => {
        handleGetTodos();
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleToggle = (id, newStatus) => {
    setLoading(true);
    toggleTodos(id, newStatus)
      .then((res) => {
        handleGetTodos();
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setLoading(true);
    deleteTodos(id)
      .then((res) => {
        handleGetTodos();
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <>
    <div>
      <div> {loading && "Loading!"}</div>

      <AddTodo handleAdd={handleAdd} />

      <button
        onClick={() =>
          setTitleSortBy((prev) => (prev === "ASC" ? "DESC" : "ASC"))
        }
      >
        {" "}
        {titleSortBy === "DESC" ? "MAKE ASCENDING" : "MAKE DESCENDING"}{" "}
      </button>

      {/* <h3>Pending</h3> */}

      {todos
        // .filter((item) => !item.status)
        .map((item) => (
          <TodoList
            key={item.id}
            title={item.title}
            status={item.status}
            id={item.id}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        ))}
      {/* <h3>Completed</h3>
      {todos
        .filter((item) => item.status)
        .map((item) => (
          <TodoList
            key={item.id}
            title={item.title}
            status={item.status}
            id={item.id}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        ))} */}
        <button disabled={page===1} onClick={() => {setPage(prev => prev - 1)}}>PREV</button>
        <button > {page} </button>
        <button onClick={() => {setPage(prev => prev + 1)}}>NEXT</button>
        
    </div>
    <Pagination total={10} current={page} onChange={(value) => setPage(value)} />
    </>
  );
}

export default Todo;
