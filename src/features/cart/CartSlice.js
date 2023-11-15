import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItemsInCart,
  fetchItemsByUserId,
  restCart,
  updateCart,
} from "./CartAPI";

const initialState = {
  cartItems: [],
  status: "idle",
  cartLoaded: false,
  addErrors: null,
  updateErrors: null,
  deleteErrors: null,
  fetchErrors: null,
  resetErrors: null,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (items, { rejectWithValue }) => {
    try {
      const { ...cartItem } = items;

      const response = await addToCart(cartItem);
      return response.data;
    } catch (error) {
      const errorMessage = error || "Failed to add product to cart";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (items, { rejectWithValue }) => {
    try {
      const { ...cartItem } = items;
      const response = await updateCart(cartItem);
      return response.data;
    } catch (error) {
      const errorMessage = error || "Failed to update cart";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteItemsCartAsync = createAsyncThunk(
  "cart/deleteItemsInCart",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await deleteItemsInCart(itemId);

      return response.data;
    } catch (error) {
      const errorMessage = error || "Failed to delete product";
      return rejectWithValue(errorMessage);
    }
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/restCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await restCart();
      return response.data;
    } catch (error) {
      const errorMessage = error || "Failed to reset cart";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCartItemsAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchItemsByUserId();

      return response.data;
    } catch (error) {
      const errorMessage = error || "Failed to fetch cart products";
      return rejectWithValue(errorMessage);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartAfterLogout: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "idle";
        state.addErrors = action.payload;
      })
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchCartItemsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.fetchErrors = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const index = state.cartItems.findIndex(
          (item) => item._id === action.payload._id
        );
        state.cartItems[index] = action.payload;
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.status = "idle";
        state.updateErrors = action.payload;
      })
      .addCase(deleteItemsCartAsync.pending, (state) => {
        state.status = "loading";
        state.deleteErrors = null;
      })
      .addCase(deleteItemsCartAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const index = state.cartItems.findIndex(
          (item) => item._id === action.payload.id
        );

        state.cartItems.splice(index, 1);
        state.deleteErrors = null;
      })
      .addCase(deleteItemsCartAsync.rejected, (state, action) => {
        state.status = "idle";
        state.deleteErrors = action.payload;
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.cartItems = [];
      })
      .addCase(resetCartAsync.rejected, (state, action) => {
        state.status = "idle";
        state.resetErrors = action.payload;
      });
  },
});
export const { resetCartAfterLogout } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectAddCartErrors = (state) => state.cart.addErrors;
export const selectUpdateCartErrors = (state) => state.cart.updateErrors;
export const selectDelCartErrors = (state) => state.cart.deleteErrors;
export const selectFetchCartErrors = (state) => state.cart.fetchErrors;
export const selectResetCartErrors = (state) => state.cart.resetErrors;

export default cartSlice.reducer;
