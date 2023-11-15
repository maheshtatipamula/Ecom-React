import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProdToWishlist,
  deleteAddress,
  fetchAllWishlistProducts,
  fetchLoggedInUser,
  fetchLoggedInUserOrders,
  updateUser,
} from "./userAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const initialState = {
  userInfo: null,
  ordersInfo: null,
  status: "idle",
  wishlistProducts: [],
  fetchOrdersError: null,
  loggedInUserError: null,
  updateUserError: null,
  addWishError: null,
  fetchWishError: null,
  deleteAddressError: null,
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "users/fetchLoggedInUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchLoggedInUserOrders();
      return response.data;
    } catch (error) {
      const errorMessage = error || "failed to fetch LoggedInUser";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "users/fetchLoggedInUser",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await fetchLoggedInUser(amount);
      return response.data;
    } catch (error) {
      const errorMessage = error || "failed to fetch LoggedInUser";
      return rejectWithValue(errorMessage);
    }
  }
);
export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateUser(userData);

      return response.data;
    } catch (error) {
      const errorMessage = error || "failed to fetch LoggedInUser";
      return rejectWithValue(errorMessage);
    }
  }
);
export const addToWishlistAsync = createAsyncThunk(
  "users/addProdToWishlist",
  async (id, { rejectWithValue }) => {
    try {
      const response = await addProdToWishlist(id);
      return response.data;
    } catch (error) {
      const errorMessage = error || "failed to fetch LoggedInUser";
      return rejectWithValue(errorMessage);
    }
  }
);
export const fetchWishlistAsync = createAsyncThunk(
  "users/fetchAllWishlistProducts",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetchAllWishlistProducts(userData);
      return response.data;
    } catch (error) {
      const errorMessage = error || "failed to fetch LoggedInUser";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteAddressAsync = createAsyncThunk(
  "users/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteAddress(id);
      toast.success("deleted successfully");

      return response.data;
    } catch (error) {
      const errorMessage = error || "failed to fetch LoggedInUser";
      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.ordersInfo = action.payload;
        state.addWishError = null;
      })
      .addCase(fetchLoggedInUserOrdersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.fetchOrdersError = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // this info can be different or more from logged-in User info
        state.userInfo = action.payload;
        state.loggedInUserError = null;
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.loggedInUserError = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // this info can be different or more from logged-in User info

        state.userInfo = action.payload;
        state.updateUserError = null;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.updateUserError = action.payload;
      })
      .addCase(fetchWishlistAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.wishlistProducts = action.payload.wishlist;
        state.fetchWishError = null;
      })
      .addCase(fetchWishlistAsync.rejected, (state, action) => {
        state.status = "idle";
        state.fetchWishError = action.payload;
      })
      .addCase(addToWishlistAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.addWishError = null;
        // state.message = action.payload.message;
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.status = "idle";
        state.addWishError = action.payload;
      })
      .addCase(deleteAddressAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.deleteAddressError = null;
      })
      .addCase(deleteAddressAsync.rejected, (state, action) => {
        state.status = "idle";
        state.deleteAddressError = action.payload;
      });
  },
});

export const selectOrdersInfo = (state) => state.users.ordersInfo;
export const selectWishlistInfo = (state) => state.users.wishlistProducts;
export const selectUserInfo = (state) => state.users.userInfo;
export const selectUserError = (state) => state.users.loggedInUserError;
export const selectFetchOrderError = (state) => state.users.fetchOrdersError;
export const selectAddWishError = (state) => state.users.addWishError;
export const selectFetchWishError = (state) => state.users.fetchWishError;
export const selectUpdateUserError = (state) => state.users.updateUserError;
export const selectDeleteUserError = (state) => state.users.deleteAddressError;

export default userSlice.reducer;
