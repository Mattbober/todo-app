"use client";
import React from "react";
import { useState } from "react";

const Todolist = ({ title }) => {
  const [list, setList] = useState([]);
  const [visibleList, setVisibleList] = useState([]);
  const [currentInput, setcurrentInput] = useState("");
  const [completeCount, setCompleteCount] = useState(0);
  const [flipCompleteFlag, setFlipCompleteFlag] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  // Updates for input Check for enter -> call handleAdd()
  const handleKeyUp = (event) => {
    setcurrentInput(event.target.value);
    if (event.key === "Enter") {
      handleAdd(currentInput);
      setcurrentInput("");
      event.target.value = "";
    }
  };

  //Add item to array on Enter
  function handleAdd(item) {
    const newList = list.concat({ id: item, name: item, complete: false });
    setList(newList);
    setVisibleList(newList);
    const count = newList.reduce((a, item) => a + !item.complete, 0);
    setCompleteCount(count);
  }

  const updateCompleteCount = () => {
    const count = list.reduce((a, item) => a + !item.complete, 0);
    setCompleteCount(count);
    return count;
  };

  const clearCompleted = () => {
    const newClearedList = list.slice();
    var filteredItems = newClearedList.filter((i) => i.complete == false);
    setList(filteredItems);
    setVisibleList(filteredItems);
  };
  const handleComplete = (id) => {
    const newList = list.slice();
    var foundIndex = newList.findIndex((item) => item.id == id);
    const item = newList[foundIndex];
    item.complete = !item.complete;
    setList(newList);
    setVisibleList(newList);
    updateCompleteCount();
  };

  const handleDelete = (id) => {
    const newList = list.slice();
    var foundIndex = newList.findIndex((item) => item.id == id);
    newList.splice(foundIndex, 1);
    setList(newList);
    setVisibleList(newList);
    const count = newList.reduce((a, item) => a + !item.complete, 0);
    setCompleteCount(count);
  };

  const filterbyActive = () => {
    const newVisibleList = list.slice();
    var filteredItems = newVisibleList.filter((i) => i.complete == false);
    setVisibleList(filteredItems);
    setActiveFilter("active");
  };

  const filterbyAll = () => {
    const filteredItems = list.slice();
    setVisibleList(filteredItems);
    setActiveFilter("all");
  };

  const filterbyComplete = () => {
    const newVisibleList = list.slice();
    var filteredItems = newVisibleList.filter((i) => i.complete == true);
    setVisibleList(filteredItems);
    setActiveFilter("complete");
  };

  const flipComplete = () => {
    var newList = list.slice();

    flipCompleteFlag
      ? newList.forEach((i) => (i.complete = false))
      : newList.forEach((i) => (i.complete = true));

    setList(newList);
    setVisibleList(newList);
    setFlipCompleteFlag(!flipCompleteFlag);
    updateCompleteCount();
  };

  const onChangeInput = (e, itemId) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      let id = itemId;

      var newList = list.slice();
      var foundIndex = newList.findIndex((item) => item.id == id);
      var foundItem = newList[foundIndex];
      foundItem.id = value;
      foundItem.name = value;
      setList(newList);
      setVisibleList(newList);
    }
  };

  return (
    <div className="flex justify-center flex-col mt-36 w-5/12 shadow-xl p-4 bg-slate-100">
      <h2 className="text-6xl font-bold dark:text-gray text-center bg-gradient-to-r from-indigo-700 to-indigo-500 outline-4 inline-block text-transparent bg-clip-text mb-3 p-1 font-bold">
        {title}
      </h2>

      {/* Adding first row */}
      <div className="flex flex-row flex-none flex-nowrap mt-2">
        <button
          onClick={() => flipComplete()}
          className="outline outline-1 px-6 text-2xl text-slate-600"
        >
          ↓
        </button>
        <input
          onKeyUp={handleKeyUp}
          type="text"
          id="todo"
          className="outline outline-1 w-full p-6 bg-slate-100"
          placeholder="Add item to be done"
          autoFocus
        ></input>
        <button className="outline outline-1 outline-black px-6 text-3xl text-red-600">
          <span className="invisible">X</span>
        </button>
      </div>
      {/* Creating Items from list */}
      <div>
        <ul>
          {visibleList.map((item) => (
            <div key={item.id} className="flex flex-row flex-none flex-nowrap">
              {/* Render checkmarks based on status */}
              {item.complete ? (
                <button
                  onClick={() => handleComplete(item.id)}
                  className="outline outline-1 outline-black px-6 text-green-400 text-3xl"
                >
                  ✓
                </button>
              ) : (
                <button
                  onClick={() => handleComplete(item.id)}
                  className="outline outline-1 outline-black px-6 text-3xl text-slate-600"
                >
                  ✓
                </button>
              )}
              {/* Render list items */}

              <input
                className="outline outline-1 w-full p-6 bg-slate-100 placeholder-gray-800 w-full p-6"
                type="text"
                defaultValue={item.name}
                onChange={console.log("hello")}
                onKeyUp={(e) => onChangeInput(e, item.id)}
              />
              <button
                onClick={() => handleDelete(item.id)}
                className="outline outline-1 outline-black px-6 text-3xl text-red-600 hover:text-red-800"
              >
                X
              </button>
            </div>
          ))}
        </ul>
        {/* Filter buttons */}
        <div className="flex flex-row">
          <p className="text-slate-400 mt-3">{completeCount} to-do</p>

          {/* Start of filter buttons (selected and not) */}
          {activeFilter == "all" ? (
            <button
              onClick={() => filterbyAll()}
              className=" px-2 text-slate-700 hover:text-slate-800 mt-1"
            >
              All
            </button>
          ) : (
            <button
              onClick={() => filterbyAll()}
              className=" px-2 text-slate-400 hover:text-slate-600 mt-1"
            >
              All
            </button>
          )}
          {activeFilter == "active" ? (
            <button
              onClick={() => filterbyActive()}
              className="px-2 text-slate-700 hover:text-slate-800 mt-1"
            >
              Active
            </button>
          ) : (
            <button
              onClick={() => filterbyActive()}
              className="px-2 text-slate-400 hover:text-slate-600 mt-1"
            >
              Active
            </button>
          )}
          {activeFilter == "complete" ? (
            <button
              onClick={() => filterbyComplete()}
              className="px-2 text-slate-700 hover:text-slate-800 mt-1"
            >
              Completed
            </button>
          ) : (
            <button
              onClick={() => filterbyComplete()}
              className="px-2 text-slate-400 hover:text-slate-600 mt-1"
            >
              Completed
            </button>
          )}
          {/* End of filter buttons (selected and not) */}
          <button
            onClick={() => clearCompleted()}
            className="bg-transparent grow ml-1 mt-1 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Clear completed ({list.length - completeCount})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
