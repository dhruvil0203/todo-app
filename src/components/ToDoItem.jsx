import React from "react";
import tick from "../../assets/tick.png";
import untick from "../../assets/not_tick.png";
import deleteidcon from "../../assets/delete.png";
const ToDoItem = ({ text, deleteTodo, id, toggle, iscomplete }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 item-center cursor-pointer"
      >
        <img
          src={iscomplete ? tick : untick}
          alt="Tick Image"
          className="w-7"
        />
        <p
          className={`text-slate-700 ml-4 text-[17px] ${
            iscomplete ? "line-through" : ""
          }`}
        >
          {text}
        </p>
      </div>
      <img
        src={deleteidcon}
        alt="Tick Image"
        className="w-4 cursor-pointer"
        onClick={() => {
          deleteTodo(id);
        }}
      />
    </div>
  );
};

export default ToDoItem;
