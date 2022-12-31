import { Archive, Delete, Edit, Unarchive } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/Inbox";
import { Box, Button, ListSubheader } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import { Todo } from "./todo-form";
const useStyles = makeStyles({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

type ArchivedTodoListProps = {
  archivedTodoList: Todo[];
  unArchiveTodo: (id: string) => void;
};

export default function ArchivedTodoList(props: ArchivedTodoListProps) {
  const { archivedTodoList, unArchiveTodo } = props;

  const classes = useStyles();

  return (
    <Box sx={{ width: "100%", maxWidth: 800 }}>
      <nav aria-label="main mailbox folders">
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Archived Todo:
            </ListSubheader>
          }
        >
          {archivedTodoList.map((todo) => (
            <ListItem disablePadding key={todo.id}>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
              <div>
                <Button>
                  <Unarchive onClick={() => unArchiveTodo(todo.id)} />
                </Button>
              </div>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
