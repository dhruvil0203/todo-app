import React from "react";

const ToDoItem = ({ text, deleteTodo, id, toggle, iscomplete }) => {
  const tick = "/tick.png";
  const untick = "/not_tick.png";
  const deleteicon = "/delete.png";

  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img src={iscomplete ? tick : untick} alt="Tick Icon" className="w-7" />
        <p
          className={`text-slate-700 ml-4 text-[17px] ${
            iscomplete ? "line-through" : ""
          }`}
        >
          {text}
        </p>
      </div>
      <img
        src={deleteicon}
        alt="Delete Icon"
        className="w-4 cursor-pointer"
        onClick={() => {
          deleteTodo(id);
        }}
      />
    </div>
  );
};

export default ToDoItem;
