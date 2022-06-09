import React from "react";
import classes from "./TodoItem.module.css";

export default function TodoItem({ title, id, isCompleted, setUpdateId, inpRef, setControllerUpdateToAdd, setCurrentItem, crre }) {
    const deleteTodo = async () => {
        const url = `/api/todos/${id}/`;
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = {
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`,
            },
        };
        await fetch(url, headers).then((res) => res.status);
        setUpdateId(id + "" + Math.random());
    };

    const updateCompleted = async (controller) => {
        const url = `/api/todos/${id}/`;
        const token = JSON.parse(localStorage.getItem("token"));
        let headers = {};

        if (controller) {
            setControllerUpdateToAdd(true);
            setCurrentItem(crre);
            inpRef.current.value = title;
            inpRef.current.focus();
        } else {
            const data = JSON.stringify({ title: title, completed: !isCompleted });
            headers = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: data,
            }
            await fetch(url, headers).then((res) => res.status);
        }
        
        setUpdateId(id + "" + Math.random());
    };

    return (
        <div
            className={
                isCompleted ? `${classes.task} ${classes.active}` : classes.task
            }
        >
            <div className={classes.content}>
                <p className={classes.text}>{title}</p>
            </div>
            <div className={classes.actions}>
                <button className={classes.edit} onClick={() => updateCompleted(false)}>
                    Completed
                </button>
                <button className={classes.edit} onClick={() => updateCompleted(true)}>Edit</button>
                <button className={classes.delete} onClick={deleteTodo}>
                    Delete
                </button>
            </div>
        </div>
    );
}
