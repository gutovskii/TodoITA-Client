import React from "react";
import { TodoHeader } from "./todo/TodoHeader";
import { TodoList } from "./todo/TodoList";
import '../styles/todo.css';
import { TodoSider } from "./todo/TodoSider";

export const Todo: React.FC = () => {
    return (
        <>
            <TodoHeader />
            <TodoList />
        </>
    );
}