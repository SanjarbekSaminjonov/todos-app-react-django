import React, { useEffect, useRef, useState } from "react";
import TodoForm from "../../components/TodoForm/TodoForm";
import Lists from "../../components/Lists/Lists";
import Login from "../../components/Login/Login";

export default function Layout() {
  const [token, setToken] = useState(null);
  const [updateId, setUpdateId] = useState(0);
  const inpRef = useRef(null);
  const [controllerUpdateToAdd,setControllerUpdateToAdd] = useState(false);
  const [ currnetItem, setCurrentItem] = useState({});

  const todo = (
    <>
      <TodoForm setToken={setToken} currnetItem={currnetItem} controllerUpdateToAdd={controllerUpdateToAdd} inpRef={inpRef} setUpdateId={setUpdateId} />
      <Lists inpRef={inpRef} setCurrentItem={setCurrentItem} setControllerUpdateToAdd={setControllerUpdateToAdd} updateId={updateId} setUpdateId={setUpdateId} />
    </>
  );

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setToken(token);
  }, []);

  return token ? todo : <Login setToken={setToken} />;
}
