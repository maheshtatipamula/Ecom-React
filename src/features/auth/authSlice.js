import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, signOut, updateUser } from "./authAPI";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const initialState = {
  loggedInUser: Cookies.get("token") || null,
  status: "idle",

  loginErrors: null,
  registerError: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      if (response.status === 200 || 201) {
        toast.success("user created successfully");
      }

      return response.data;
    } catch (error) {
      const errorMessage = error || "register failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      Cookies.set("token", response.data.token, { expiresIn: "2d" });

      window.location.reload();

      return response.data;
    } catch (error) {
      const errorMessage = error || "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  "user/signOut",
  async (userData) => {
    const response = await signOut(userData);
    Cookies.remove("token");

    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.registerError = null;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.registerError = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;

        state.loginErrors = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";

        state.loginErrors = action.payload;
      })

      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.user.loggedInUser;

export const selectErrors = (state) => state.user.loginErrors;
export const selectRegisterErrors = (state) => state.user.registerError;
export default userSlice.reducer;
