import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import authHeader from "../services/auth.header.js";
const URL = "http://localhost:4000/user/profile";

const initialState = {
  user: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const getUserDetails = createAsyncThunk("aswers", async () => {
  let user = [];
  const response = await axios.get(URL).then((data) => data.data);
  user = [...response];
  return user;
});

// export const removeQuestion = createAsyncThunk(
//   "deleteQuestion", async (data) => {
//   console.log(data.question_id);
//   await axios.delete(`${url}/question/${data.question_id}`).then((data) => data.data);
// });

// export const updateQuestion= createAsyncThunk(
//   "updateQuestion", async (data) => {
//   await axios.put(`${url}/questions/question/${data.question_id}`).then((data) => data.data);
// });

// export const updateAnswer= createAsyncThunk("updateanswer", async (data) => {
//   console.log(data.answer_id);
//   await axios.patch(`${url}/answers/answer/${data.answer_id}`, data).then((data) => data.data);
// });

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