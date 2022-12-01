import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  questions: [],
  loading: false,
}

const getQuestions = createAsyncThunk(
    'questions/getQuestions',
    async (thunkAPI) => {
      const res = await axios.get('').then(
      (data) => data.json()
    )
    return res
})


export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: {
      [getQuestions.pending]: (state) => {
        state.loading = true
      },
      [getQuestions.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.questions = payload
      },
      [getQuestions.rejected]: (state) => {
        state.loading = false
      },
    },
  })

export const quaestionReducer = questionSlice.reducer