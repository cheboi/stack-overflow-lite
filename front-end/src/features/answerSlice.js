import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "http://localhost:4000/answers";

const initialState = {
  answers: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const getAnswers = createAsyncThunk(
  "answers/getAnswers",
  async (thunkAPI) => {
    try {
      const res = await axios.get(URL);
      console.log(res.data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const addAnswer = createAsyncThunk(
  "answer/addAnswer",

  async (initialAnswer, thunkAPI) => {
    try {
      const res = await axios.post(URL, initialAnswer);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectedWithValue({ error: err.message });
    }
  }
);

export const updateAnswer = createAsyncThunk(
  "answer/updateAnswer",
  async (data) => {
    // console.log(data);
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
