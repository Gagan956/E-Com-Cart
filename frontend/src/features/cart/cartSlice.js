import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, removeFromCart as removeFromCartAPI, updateCartItem, clearCart as clearCartAPI } from "./cartAPI";

export const loadCart = createAsyncThunk('cart/load', async () => {
  return await getCart();
});

export const removeFromCart = createAsyncThunk('cart/remove', async (productId) => {
  await removeFromCartAPI(productId);
  return productId;
});

export const updateCartQuantity = createAsyncThunk('cart/updateQuantity', async ({ productId, quantity }) => {
  await updateCartItem(productId, quantity);
  return { productId, quantity };
});

export const clearCart = createAsyncThunk('cart/clear', async () => {
  await clearCartAPI();
  return [];
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { 
    items: [], 
    loading: false, 
    error: null 
  },
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Load cart
      .addCase(loadCart.pending, (state) => { 
        state.loading = true; 
        state.error = null;
      })
      .addCase(loadCart.fulfilled, (state, action) => { 
        state.loading = false; 
        state.items = action.payload?.items || []; 
        state.error = null;
      })
      .addCase(loadCart.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.error.message;
      })
      // Remove from cart
      .addCase(removeFromCart.pending, (state) => { 
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.productId?._id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update quantity
      .addCase(updateCartQuantity.pending, (state) => { 
        state.loading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, quantity } = action.payload;
        const item = state.items.find(item => item.productId?._id === productId);
        if (item) {
          item.quantity = quantity;
        }
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Clear cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.error = null;
      });
  }
});

export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;