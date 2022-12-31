import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import React from "react";
import Button from "../components/add-todo-button";
import ArchivedTodoList from "../components/archieved-todo-list";
import TodoForm, { Todo } from "../components/todo-form";
import TodoList from "../components/todo-list";

const useStyles = makeStyles({});

export default function Home() {
  const [todoList, setTodoList] = React.useState<Todo[]>([]);
  const [archivedTodoList, setArchivedTodoList] = React.useState<Todo[]>([]);

  const [currentTodo, setCurrentTodo] = React.useState<Todo>();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const classes = useStyles();

  const startEdit = (id: string) => {
    setCurrentTodo(todoList.filter((todo) => todo.id === id)[0]);
    setDialogOpen(true);
  };

  const deleteTodo = (id: string) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  const archiveTodo = (id: string) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    const index = todoList.findIndex((todo) => todo.id === id);

    setArchivedTodoList([
      ...archivedTodoList,
      { ...todoList[index], archivedAt: new Date() },
    ]);
    setTodoList(newTodoList);
  };

  const unArchiveTodo = (id: string) => {
    const newArchivedList = archivedTodoList.filter((todo) => todo.id !== id);
    const removedTodoIndex = archivedTodoList.findIndex(
      (todo) => todo.id === id
    );
    setTodoList([...todoList, archivedTodoList[removedTodoIndex]]);
    setArchivedTodoList(newArchivedList);
  };
  const router = useRouter();
  const todoImage = {
    url: "https://images.unsplash.com/photo-1641154706848-fe27fd366032?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    title: "Add Todo",
    width: "40%",
  };
  const weatherImage = {
    url: "https://images.unsplash.com/photo-1534794048419-48e110dca88e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1352&q=80",
    title: "Weather",
    width: "40%",
  };

  return (
    <Box>
      <Button onClick={() => setDialogOpen(true)} image={todoImage} />
      <TodoForm
        setTodoList={setTodoList}
        closeDialog={() => setDialogOpen(!dialogOpen)}
        dialogOpen={dialogOpen}
        todoList={todoList}
        todoItem={currentTodo}
      />
      <TodoList
        todoList={todoList}
        deleteTodo={deleteTodo}
        startEdit={startEdit}
        archiveTodo={archiveTodo}
      />
      <ArchivedTodoList
        archivedTodoList={archivedTodoList}
        unArchiveTodo={unArchiveTodo}
      />
      <Button onClick={() => router.push("/weather")} image={weatherImage} />
    </Box>
  );
}
