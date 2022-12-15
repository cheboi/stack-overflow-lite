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
  const response = await axios.post(URL).then((data) => data.data);
  user = [...response];
  return user;
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