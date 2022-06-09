import React, { useEffect, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import classes from "./Lists.module.css";

export default function Lists({
  updateId,
  setUpdateId,
  inpRef,
  setControllerUpdateToAdd,
  setCurrentItem,
}) {
  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [updateId]);

  const getData = async () => {
    const url = "/api/todos/";
    const token = JSON.parse(localStorage.getItem("token"));

    const response = fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.then((res) => res.json());
    setData(data);
    setFiltredData(data);
  };

  const changeHandle = (e) => {
    switch (e.target.value) {
      case "all":
        setFiltredData(data);
        break;
      case "completed":
        setFiltredData(data.filter(item => item.completed === true));
        break;
      case "uncompleted":
        setFiltredData(data.filter(item => item.completed === false));
        break;
      default:
        break;
    }
  };

  const todoItem = filtredData.length
    ? filtredData.map((item) => {
        return (
          <TodoItem
            title={item.title}
            id={item.id}
            isCompleted={item.completed}
            key={item.id}
            setUpdateId={setUpdateId}
            inpRef={inpRef}
            crre={item}
            setControllerUpdateToAdd={setControllerUpdateToAdd}
            setCurrentItem={setCurrentItem}
          />
        );
      })
    : "";
  return (
    <main>
      <select className={classes.selectFilter} onChange={changeHandle}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
      <section className={classes.task_list}>{todoItem}</section>
    </main>
  );
}
