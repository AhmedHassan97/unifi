import { Archive, Delete, Edit } from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StarBorder from "@mui/icons-material/StarBorder";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { Todo } from "./todo-form";

type TodoItemProps = {
  todo: Todo;
  startEdit: (id: string) => void;
  deleteTodo: (id: string) => void;
  archiveTodo: (id: string) => void;
};
const useStyles = makeStyles({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default function TodoItem(props: TodoItemProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const { todo, startEdit, deleteTodo, archiveTodo } = props;
  const handleClick = () => {
    setOpen(!open);
  };
  const classes = useStyles();

  return (
    <>
      <List component="div" disablePadding className={classes.row}>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>{todo.title}</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <div>
          <Button onClick={() => startEdit(todo.id)}>
            <Edit />
          </Button>
          <Button>
            <Delete onClick={() => deleteTodo(todo.id)} />
          </Button>
          <Button>
            <Archive onClick={() => archiveTodo(todo.id)} />
          </Button>
        </div>
      </List>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText>{todo.description}</ListItemText>
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}
