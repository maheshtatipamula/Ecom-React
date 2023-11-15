import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllBrands,
  fetchAllCategory,
  fetchAllProducts,
  fetchProductByFilters,
  fetchSingleProduct,
} from "./productListAPI";

const initialState = {
  products: [],
  brands: [],
  category: [],
  selectedProduct: null,
  status: "idle",
  totalItems: 0,
  productsErrors: null,
  brandsErrors: null,
  categoryErrors: null,
  singleProdError: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
// export const fetchAllProductsAsync = createAsyncThunk(
//   "product/fetchAllProducts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchAllProducts();
//       return response.data;
//     } catch (error) {
//       const errorMessage = error || "Failed to fetch products";
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilters",
  async ({ filter, sort, pagination }, { rejectWithValue }) => {
    try {
      const response = await fetchProductByFilters(filter, sort, pagination);

      return response.data;
    } catch (error) {
      const errorMessage = error || "Failed to fetch products";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchSingleProductAsync = createAsyncThunk(
  "product/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchSingleProduct(id);
      return response.data;
    } catch (error) {
      const errorMessage = error || "Failed to fetch products";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchAllCateogriesAsync = createAsyncThunk(
  "product/fetchAllCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllCategory();
      return response.data;
    } catch (error) {
      const errorMessage = error || "Failed to fetch products";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllBrands();
      return response.data;
    } catch (error) {
      const errorMessage = error || "Failed to fetch products";
      return rejectWithValue(errorMessage);
    }
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;

        state.totalItems = action.payload.totalDocuments;
      })
      .addCase(fetchProductsByFilterAsync.rejected, (state, action) => {
        state.status = "idle";
        state.productsErrors = action.payload;
      })
      .addCase(fetchAllCateogriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCateogriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
        state.categoryErrors = null;
      })
      .addCase(fetchAllCateogriesAsync.rejected, (state, action) => {
        state.status = "idle";
        state.categoryErrors = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
        state.brandsErrors = null;
      })
      .addCase(fetchAllBrandsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.brandsErrors = action.payload;
      })
      .addCase(fetchSingleProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
        state.singleProdError = null;
      })
      .addCase(fetchSingleProductAsync.rejected, (state, action) => {
        state.status = "idle";
        state.singleProdErrorErrors = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectCategoryItems = (state) => state.product.category;
export const selectbrandsItems = (state) => state.product.brands;
export const selectedProductDetails = (state) => state.product.selectedProduct;

export const selectedProductErrors = (state) => state.product.productsErrors;
export const selectedBrandsErrors = (state) => state.product.brandsErrors;
export const selectedCategoryErrors = (state) => state.product.categoryErrors;
export const selectedSingleProductErrors = (state) =>
  state.product.singleProdError;

export default productSlice.reducer;
