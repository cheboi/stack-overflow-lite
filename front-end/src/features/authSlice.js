import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { url, setHeaders } from "./api/api";

const initialState = {
  token: localStorage.getItem("token"),
  id: "",
  username: "",
  email: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/signup`, {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data) => {
    await axios.post(`${url}/login`, data).then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = await axios.get(`${url}/user/${id}`, setHeaders());

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLoggedInUser = createAsyncThunk(
  "user/getLoggedInUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${url}/myProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res.data;
      return data;
    } catch (error) {
      const { message } = error.response.data.msg;
      if (message === "jwt expired") {
        dispatch(logoutUser ());
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // loadUser(state, action) {
    //   const token = state.token;
    //   console.log(token);

    //   if (token) {
    //     const user = jwtDecode(token);
    //     return {
    //       ...state,
    //       token,
    //       id: user.id,
    //       username: user.username,
    //       email: user.email,
    //       userLoaded: true,
    //     };
    //   } else return { ...state, userLoaded: true };
    // },
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          username: user.username,
          email: user.email,
          id: user.id,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          username: user.username,
          email: user.email,
          id: user.id,
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
    builder.addCase(getUser.pending, (state, action) => {
      return {
        ...state,
        getUserStatus: "pending",
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          username: user.username,
          email: user.email,
          id: user.id,
          getUserStatus: "success",
        };
      } else return state;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return {
        ...state,
        getUserStatus: "rejected",
        getUserError: action.payload,
      };
    });

    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isSuccess = false;
    });
    builder.addCase(getLoggedInUser.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
