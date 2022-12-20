import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders } from "./api/api";
const URL = "http://localhost:4000/answers";

const initialState = {
  answers: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const getAnswers = createAsyncThunk(
  "answers/getAnswers",
  async (thunkAPI) => {
    let Answers = [];
    try {
      const response = await axios
        .get(`${URL}/question/${thunkAPI}`, { headers: setHeaders() })
        .then((data) => data.data);
      Answers = [...response];
      return Answers;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const addAnswer = createAsyncThunk(
  "answers/addAnswer",
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
  "answers/updateAnswer",
  async (data) => {
    // console.log(data);
    const response = await axios
      .put(`${URL}/${data.id}`, data)
      .then((data) => data.data);
    return response;
  },
  getAnswers()
);

export const VoteAnswer = createAsyncThunk("votes/voteAnswer", async (data) => {
  const response = await axios
    .post(
      `${URL}/vote/${data.answer_id}`,
      data
      //  { headers: authHeader() }
    )
    .then((data) => data.data);
  return response;
});

export const preferedAnswer = createAsyncThunk("accepted", async (data) => {
  console.log(data);
  const response = await axios
    .put(
      `${URL}/prefered`,
      data
      //  { headers: setHeaders() }
    )
    .then((data) => data.data);
  return response;
});

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

export const selectAllAnswers = (state) => state.answer?.answers;
export const getAnswerStatus = (state) => state.answer?.status;
export const getErrorStatus = (state) => state.answer?.error;

const answerReducer = answerSlice.reducer;
export default answerReducer;
