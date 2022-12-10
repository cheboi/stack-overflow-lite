import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../services/auth.header.js";
const URL = "http://localhost:4000/answers";

const initialState = {
  answers: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const getAnswers = createAsyncThunk(
  "answers/getAnswers",
  async (data) => {
    let answers = [];
    const response = await axios
      .post(`${URL}/${data}`, data)
      .then((data) => data.data);
    answers = [...response];
    console.log(answers);
    return answers;
  }
);

export const addAnswer = createAsyncThunk(
  "answer/addAnswer",
  async (data) => {
    console.log(data);
    const response = await axios
      .post(URL, data, { headers: authHeader() })
      .then((data) => data.json());
    return response;
  },
  getAnswers()
);

export const updateAnswer = createAsyncThunk(
  "answer/updateAnswer",
  async (data) => {
    console.log(data);
    const response = await axios
      .put(`${URL}/${data.id}`, data)
      .then((data) => data.data);
    return response;
  },
  getAnswers()
);
export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnswers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAnswers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.answers = action.payload;
      })
      .addCase(getAnswers.rejected, (state, action) => {
        state.status = "failed";
        state.answers = action.payload.message.error;
      });
  },
});

export const selectAllAnswers = (state) => state.answers?.questions;
export const getAnswerStatus = (state) => state.answers?.status;
export const getErrorStatus = (state) => state.answers?.error;

const answerReducer = answerSlice.reducer;
export default answerReducer;
