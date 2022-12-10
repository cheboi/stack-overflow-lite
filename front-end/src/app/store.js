import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import messageReducer from "../features/messageSlice";
import questionReducer from "../features/questionSlice";
import answerReducer from "../features/answerSlice";
import userReducer from "../features/userSlice";
import commentReducer from "../features/commentSlice"

const reducer = {
  auth: authReducer,
  message: messageReducer,
  questions: questionReducer,
  answer: answerReducer,
  comment:commentReducer,
  user:userReducer
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
