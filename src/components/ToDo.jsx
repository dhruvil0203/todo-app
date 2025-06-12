import React, { useEffect, useRef, useState, useContext } from "react";
import ToDoItem from "./ToDoItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "../context/ThemeProvider";
import { ThemeContext } from "../context/ThemeContext";

const ToDo = () => {
  const { theme, handleToggleTheme } = useContext(ThemeContext);
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
  const editTodo = (id, newText) => {
    setTodoList((prevTodo) =>
      prevTodo.map((todoitem) => {
        if (todoitem.id === id) {
          return { ...todoitem, text: newText };
        }
        return todoitem;
      })
    );
  };

  const toggle = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.map((todoitem) => {
        if (todoitem.id === id) {
          return { ...todoitem, iscomplete: !todoitem.iscomplete };
        }
        return todoitem;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div
      className={`h-screen w-screen flex items-center justify-center transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full sm:w-9/12 max-w-md flex flex-col p-5 sm:p-7 min-h-[380px] rounded-xl shadow-2xl transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <button
          className="self-end bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 rounded-full w-10 h-10 flex items-center justify-center text-xl transition duration-200"
          onClick={handleToggleTheme}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <div className="flex items-center mt-7 gap-3">
          <img
            src="/checklist_10552402.png"
            alt="TO-DO Icon"
            className="h-8 w-8"
          />
          <h1 className="font-bold text-3xl tracking-tight">To-Do List</h1>
        </div>

        <div
          className={`flex items-center my-7 rounded-full shadow-inner overflow-hidden ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <input
            type="text"
            placeholder="Add your task"
            ref={inputRef}
            className={`flex-1 h-14 pl-4 pr-2 bg-transparent text-base focus:outline-none ${
              theme === "dark"
                ? "text-white placeholder:text-gray-400"
                : "text-gray-900 placeholder:text-gray-600"
            }`}
          />
          <button
            onClick={add}
            className="h-14 px-6 cursor-pointer bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-all duration-200"
          >
            ADD +
          </button>
        </div>

        <div className="space-y-3 w-full">
          {todoList.map((item, index) => (
            <ToDoItem
              key={index}
              text={item.text}
              id={item.id}
              iscomplete={item.iscomplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
              editTodo={editTodo}
            />
          ))}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ToDo;
