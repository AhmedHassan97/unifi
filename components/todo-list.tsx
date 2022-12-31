import { Box, Button } from "@mui/material";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { makeStyles } from "@mui/styles";
import React from "react";
import TodoItem from "../components/todo-item";
import { Todo } from "./todo-form";
import { Delete, Edit } from "@mui/icons-material";

const useStyles = makeStyles({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
type TodoListProps = {
  todoList: Todo[];
  startEdit: (id: string) => void;
  deleteTodo: (id: string) => void;
  archiveTodo: (id: string) => void;
};

export default function TodoList(props: TodoListProps) {
  const { todoList, deleteTodo, startEdit, archiveTodo } = props;

  const classes = useStyles();

  return (
    <Box>
      <List
        sx={{ width: "100%", maxWidth: 800 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Todo:
          </ListSubheader>
        }
      >
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            startEdit={startEdit}
            archiveTodo={archiveTodo}
          />
        ))}
      </List>
    </Box>
  );
}
