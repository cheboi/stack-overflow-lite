import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {setHeaders} from "./api/api"
// import authHeader from "../services/auth.header.js";
const URL = "http://localhost:4000/user/profile";

const initialState = {
  user: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getUserDetails = createAsyncThunk(
  "user/userDetails", async () => {
  let user = [];
  const response = await axios
    .get(URL, { headers: setHeaders() })
    .then((data) => data.data);
  user = [...response];
  return user;
});

export const deleteQuestion = createAsyncThunk(
  "user/deleteQuestion", 
  async (data) => {
  console.log(data.question_id);
  await axios.delete(`${URL}/question/${data.question_id}`).then((data) => data.data);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Answers = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.Answers = action.payload.message.error;
      });
  },
});
const userReducer = userSlice.reducer;
export default userReducer;