import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:4000/comments";
const initialState = {
  comments: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const getComments = createAsyncThunk("comments/getComments", async (data) => {
  let Comments = [];
  const response = await axios
    .post(`${url}/${data}`, data)
    .then((data) => data.data);
  Comments = [...response];
  return Comments;
});

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (data) => {
    console.log(data);
    const response = await axios
      .post(url, data)
      .then((data) => data.json());
    return response;
  },
  getComments()
);


export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.status = "failed";
        state.questions = action.payload.message.error;
      });
  },
});

export const selectAllCommentss = (state) => state.comments?.questions;
export const getCommentStatus = (state) => state.comments?.status;
export const getErrorStatus = (state) => state.comments?.error;

const commentReducer = commentSlice.reducer;
export default commentReducer;