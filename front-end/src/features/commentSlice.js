import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders } from "./api/api";

const url = "http://localhost:4000/comment/";
const initialState = {
  comments: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const getComments = createAsyncThunk(
  "comments/getComments",
  async (data) => {
    let Comments = [];
    const response = await axios
      .get(`${url}/${data}`, data
      , {headers:setHeaders ()}
      )
      .then((data) => data.data);
    Comments = [...response];
    return Comments;
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (data) => {
    console.log(data);
    const response = await axios.post(url, data, {headers:setHeaders ()}).then((data) => data.json());
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
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.status = "failed";
        state.comments = action.payload.message.error;
      });
  },
});

export const selectAllComments = (state) => state.comment?.comments;
export const getCommentStatus = (state) => state.comment?.status;
export const getErrorStatus = (state) => state.comment?.error;

const commentReducer = commentSlice.reducer;
export default commentReducer;
