import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL =""
const initialState = {
  questions: [],
  status: "idle",
};

export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async () => {
    const response = await axios.get(URL);
    let ourdata = [];
    for (let key in response.data) {
      ourdata.push({
        id:key,
        title: response.data[key].title,
        description: response.data[key].description,
      });
    }
    console.log(ourdata);
    return ourdata;
  }
);

export const askQuestion = createAsyncThunk(
  "questions/askedQuestion",
  async (initialQuestion) => {
    const response = await axios.post(URL, initialQuestion);
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