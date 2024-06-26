import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteTodo } from "./deleteTodo";
import { TodoType } from "../types";

interface Payload {
  todos: TodoType[];
}

export const deleteAllCompletedTodos = createAsyncThunk<
  void,
  Payload,
  {
    rejectValue: unknown;
  }
>(
  "todoReducer/deleteAllCompletedTodos",
  async ({ todos }, { rejectWithValue, dispatch }) => {
    try {
      await Promise.all(
        todos.map(async (todo) => {
          if (todo.completed) {
            await dispatch(deleteTodo({ id: todo.id }));
          }
        })
      );
    } catch (error) {
      const errorData = axios.isAxiosError(error)
        ? error.response?.data
        : error;
      return rejectWithValue(errorData);
    }
  }
);
