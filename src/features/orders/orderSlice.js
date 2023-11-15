import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { createOrder, fetchSingleOrder } from "./orderAPI";
import toast from "react-hot-toast";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  singleOrder: [],
  singleOrderError: null,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await createOrder(amount);
      toast.success("order placed Successfully");
      return response.data;
    } catch (error) {
      const errorMessage = error || "order failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchSingleOrderAsync = createAsyncThunk(
  "order/fetchSingleOrder",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await fetchSingleOrder(amount);

      return response.data;
    } catch (error) {
      const errorMessage = error || "order failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(fetchSingleOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.singleOrder = action.payload;
        state.singleOrderError = null;
      })
      .addCase(fetchSingleOrderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.singleOrderError = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrder = (state) => state.order.orders;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectSingleOrder = (state) => state.order.singleOrder;
export const selectSingleOrderError = (state) => state.order.singleOrderError;

export default orderSlice.reducer;
