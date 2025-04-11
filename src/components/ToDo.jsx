import React, { useEffect, useRef, useState } from "react";
import ToDoItem from "./ToDoItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToDo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();
  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      toast("Please enter a task!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        style: {
          color: "white",
          backgroundColor: "red",
        },
      });
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      iscomplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };
  const deleteTodo = (id) => {
    return setTodoList((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };
  const toggle = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.map((todoitem) => {
        if (todoitem.id === id) {
          return { ...todoitem, iscomplete: !todoitem.iscomplete };
        }
      });
    });
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);
  return (
    <div className="place-self-center w-full sm:w-9/12 max-w-md flex flex-col p-5 sm:p-7 min-h-[380px] rounded-xl bg-white">
      <div className="flex items-center mt-7 gap-2">
        <img
          src="/assets/todo_icon.png"
          alt="TO-DO Image"
          className="h-7 w-7"
        />
        <h1 className="font-semibold text-3xl">To-Do List</h1>
      </div>

      {/* Input Box */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          type="text"
          placeholder="Add your task"
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* TO-DO List */}

      <div>
        {todoList.map((item, index) => {
          return (
            <ToDoItem
              key={index}
              text={item.text}
              id={item.id}
              iscomplete={item.iscomplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ToDo;
