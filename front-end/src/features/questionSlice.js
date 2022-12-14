import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authHeader from "../services/auth.header";
import axios from "axios";

const URL = "http://localhost:4000/questions";
const initialState = {
  questions: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async () => {
    const response = await axios.get(URL);
    console.log(response.data);
    return response.data;
  }
);

export const askQuestion = createAsyncThunk(
  "questions/askedQuestion",
  async (initialQuestion) => {
    const response = await axios
      .post(URL, initialQuestion, { headers: authHeader() })
      .then((data) => data.json());
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

// const { getQUestions } = questionSlice.actions;
export const selectAllQuestions = (state) => state.questions?.questions;
export const getQuestionStatus = (state) => state.questions?.status;
export const getErrorStatus = (state) => state.questions?.error;

export default questionSlice.reducer;
