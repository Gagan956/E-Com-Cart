import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchProduct } from "./productAPI";

export const loadProducts = createAsyncThunk('products/load', async () => {
  return await fetchProducts();
});

export const loadProduct = createAsyncThunk('products/loadOne', async (id) => {
  return await fetchProduct(id);
});

const productSlice = createSlice({
  name: 'products',
  initialState: { 
    items: [], 
    currentProduct: null,
    loading: false, 
    error: null 
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Load all products
      .addCase(loadProducts.pending, (state) => { 
        state.loading = true; 
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => { 
        state.loading = false; 
        state.items = action.payload;
        state.error = null;
      })
      .addCase(loadProducts.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.error.message;
      })
      // Load single product
      .addCase(loadProduct.pending, (state) => { 
        state.loading = true; 
        state.error = null;
      })
      .addCase(loadProduct.fulfilled, (state, action) => { 
        state.loading = false; 
        state.currentProduct = action.payload;
        state.error = null;
      })
      .addCase(loadProduct.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.error.message;
      });
  }
});

export const { clearCurrentProduct, clearError } = productSlice.actions;
export default productSlice.reducer;