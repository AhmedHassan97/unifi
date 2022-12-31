import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import { nanoid } from "nanoid";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  textInput: {
    color: "#2E3A59",
    width: "100%",
    marginTop: 20,
  },
  submit: {},
});

type TodoFormProps = {
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  dialogOpen: boolean;
  closeDialog: () => void;
  todoList: Todo[];
  todoItem?: Todo;
};

export type Todo = {
  id: string;
  description: string;
  title: string;
  createdAt: Date;
  FinishedAt: Date | undefined;
  checked: boolean;
  editedAt: Date | undefined;
  archivedAt: Date | undefined;
};

const TodoSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string().optional(),
});

export default function TodoForm(props: TodoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<z.TypeOf<typeof TodoSchema>>({
    mode: "onChange",
    resolver: zodResolver(TodoSchema),
  });

  const { setTodoList, dialogOpen, closeDialog, todoItem, todoList } = props;

  const classes = useStyles();

  const onSubmit: SubmitHandler<z.TypeOf<typeof TodoSchema>> = async (data) => {
    if (todoItem) {
      const toBeEditedIndex: number = todoList.findIndex(
        (todo) => todo.id === todoItem.id
      );

      todoList[toBeEditedIndex].title = data.title;
      todoList[toBeEditedIndex].description = data.title;
      todoList[toBeEditedIndex].editedAt = new Date();

      setTodoList(todoList);
    } else {
      setTodoList((prev) => {
        return [
          ...prev,
          {
            id: nanoid(),
            title: data.title,
            archivedAt: undefined,
            checked: false,
            createdAt: new Date(),
            description: data.description ?? "",
            FinishedAt: undefined,
            editedAt: undefined,
          },
        ];
      });
    }
    reset();
    closeDialog();
  };

  React.useEffect(() => {
    if (todoItem) {
      reset({
        title: todoItem?.title,
        description: todoItem?.description,
      });
    }
  }, [todoItem, reset]);

  return (
    <div>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Todo</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  variant="outlined"
                  label="Title"
                  className={classes.textInput}
                  placeholder="Title"
                  inputRef={ref}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  variant="outlined"
                  label="Description"
                  className={classes.textInput}
                  inputRef={ref}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  {...field}
                />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
