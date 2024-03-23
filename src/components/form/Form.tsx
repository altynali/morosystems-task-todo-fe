import { Box, Button } from "@mui/material";
import { useState } from "react";
import { MyInput } from "../input/MyInput";
import classes from "./Form.module.css";
import { useAppDispatch } from "../../redux/store";
import { createTodo } from "../../redux/todo/thunks";
import { nameValidation } from "../../utils/validation";

export const Form = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const handleCreateToDo = () => {
    if (validateName(name)) {
      dispatch(createTodo({ text: name }));
      setName("");
      setError("");
    }
  };

  const nameChangeHandler = (value: string) => {
    setName(value);
    validateName(value);
  };

  const validateName = (name: string) => {
    const { requiredMessage, pattern } = nameValidation();

    if (!name) {
      setError(requiredMessage);
      return false;
    }
    if (!isDirty && !name.match(pattern.value)) {
      setError(pattern.message);
      return false;
    }

    setError("");
    return true;
  };

  return (
    <Box className={classes.root}>
      <MyInput
        required
        className={classes.input}
        label="Name"
        helperText={error}
        value={name}
        onChange={(e) => nameChangeHandler(e.target.value)}
        onBlur={() => setIsDirty(true)}
      />
      <Button variant="contained" color="primary" onClick={handleCreateToDo}>
        Add
      </Button>
    </Box>
  );
};
