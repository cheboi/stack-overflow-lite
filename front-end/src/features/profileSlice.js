import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL =""
const initialState = {
  comments: [],
  status: "idle",
};

export const getUserComments = createAsyncThunk(
  "comments/getUserComments",
  async (userId) => {
    const response = await axios.get(URL, userId);
    return response.data;
  }
);

export const userAskQuestions = createAsyncThunk(
  "questions/userAskedQuestion",
  async (UserId) => {
    const response = await axios.post(URL, userId);
    return response.data;
  }
);

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    questionAsked: {
      reducer(state, action) {
        state.questions.push(action.payload);
      },
      prepare(title, description) {
        return {
          payload: {
            title,
            description,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.questions = action.payload.message.error;
      });
  },
});

const {getQUestions } = questionSlice.actions;
export const selectAllQuestions = (state) => state.questions.questions;

export default questionSlice.reducer;