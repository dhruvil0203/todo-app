import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ToDoItem = ({ text, deleteTodo, id, toggle, iscomplete, editTodo }) => {
  const tick = "/tick.png";
  const untick = "/not_tick.png";
  const deleteicon = "/trash_9915690.png";
  const editicon = "/pen_12080619.png";

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const { theme } = useContext(ThemeContext);

  const handleSave = () => {
    if (editedText.trim() !== "") {
      editTodo(id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center my-2 gap-2">
      <div
        onClick={() => toggle(id)}
        className="flex items-center flex-1 cursor-pointer"
      >
        <img
          src={iscomplete ? tick : untick}
          alt="Tick Icon"
          className="w-5 ml-3"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="ml-4 border-b border-gray-400 focus:outline-none text-[17px] w-full"
          />
        ) : (
          <p
            className={`ml-4 text-slate-700 text-[17px] ${
              iscomplete ? "line-through" : ""
            }`}
          >
            {text}
          </p>
        )}
      </div>

      {isEditing ? (
        <button
          onClick={handleSave}
          className="text-green-600 text-sm font-semibold px-1"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-600 text-sm font-semibold px-1"
        >
          <img
            src={editicon}
            onClick={() => setIsEditing(true)}
            className="w-5.5 h-5.5 cursor-pointer  "
            alt="Edit"
          />
        </button>
      )}

      <img
        src={deleteicon}
        alt="Delete Icon"
        className={`w-5.5 h-5.5 cursor-pointer mr-4.5 ${
          theme === "dark" ? "" : "text-black"
        }`}
        onClick={() => deleteTodo(id)}
      />
    </div>
  );
};

export default ToDoItem;
