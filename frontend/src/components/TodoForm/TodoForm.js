import React from "react";
import classes from "./TodoForm.module.css";

export default function TodoForm({
  inpRef,
  setUpdateId,
  controllerUpdateToAdd,
  currnetItem,
  setToken
}) {
  const addTodo = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("token"));
    if (inpRef.current.value !== "") {
      if (controllerUpdateToAdd) {
        const url = `/api/todos/${currnetItem?.id}/`;

        const data = JSON.stringify({
          ...currnetItem,
          title: inpRef.current.value,
        });
        const headers = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: data,
        };
        await fetch(url, headers).then((res) => res.status);
        setUpdateId(Math.random());
        inpRef.current.value = "";
      } else {
        const url = "/api/todos/";

        const data = { title: inpRef.current.value };
        const headers = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(data),
        };
        const response = fetch(url, headers);
        const answer = await response.then((res) => res.json());
        if (answer["id"]) {
          setUpdateId(answer["id"]);
        }
        inpRef.current.value = "";
      }
    }
  };

  const logOut = () => {
    setToken(null);
    localStorage.setItem("token", JSON.stringify(""));
  }

  return (
    <header>
      <div className={classes.df}>
        <h1>ToDo List</h1>
        <input
          type="button"
          className={classes.new_task_submit}
          value="Log Out"
          onClick={logOut}
        />
      </div>
      <form className={classes.new_task_form} onSubmit={addTodo}>
        <input
          type="text"
          ref={inpRef}
          className={classes.new_task_input}
          placeholder="What do you have planned?"
        />
        <input
          type="submit"
          className={classes.new_task_submit}
          value="Add todo"
        />
      </form>
    </header>
  );
}
