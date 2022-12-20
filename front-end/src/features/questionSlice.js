import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders } from "./api/api";


const URL = "http://localhost:4000/questions";
const initialState = {
  questions: [],
  search: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async () => {
    const response = await axios.get(URL);
    // console.log(response.data);
    return response.data;
  }
);

export const askQuestion = createAsyncThunk(
  "questions/askedQuestion",
  async (initialQuestion) => {
    const response = await axios
      .post(URL, initialQuestion, {headers:setHeaders ()})
      .then((data) => data.json());
    return response.data;
  }
);

export const searchQuestions = createAsyncThunk(
  //http://localhost:4000/questions/question/search/
  "search/searchQuestions",
  async (data) => {
    let search = [];
    const response = await axios
      .post(`${URL}/question/search/`, {
        params: {
          value: data,
        },
      })
      .then((data) => data.data);
    search = [...response];
    return search;
  }
);

export const getQuestionById = createAsyncThunk(
  "questions/getQuestionById",
  async (id) => {
    const res = await axios.get(`http://localhost:4000/questions/${id}`);
    const { data } = res.data;
    return data;
  }
);

export const getRecentAskedQuestions = createAsyncThunk(
  "questions/getRecentAskedQuestions",
  async () => {
    const response = await axios.get(`${URL}/recent`);
    const { data } = response.data;
    return data;
  }
);

export const getMostAnsweredQuestions = createAsyncThunk(
  "questions/getMostAnsweredQuestions",
  async () => {
    const response = await axios.get(`${URL}/question/mostanseredquestion`);
    const { data } = response.data;
    return data;
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
      })
      .addCase(getRecentAskedQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(getMostAnsweredQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(searchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
  },
});

export const selectAllQuestions = (state) => state.questions?.questions;
export const getQuestionStatus = (state) => state.questions?.status;
export const getErrorStatus = (state) => state.questions?.error;

export default questionSlice.reducer;
