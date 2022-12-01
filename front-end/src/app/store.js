import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import messageReducer from "../features/messageSlice";
import  questionReducer from "../features/questionSlice";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  questions:  questionReducer
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
