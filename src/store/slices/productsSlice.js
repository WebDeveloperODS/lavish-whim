// store/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk – updates status on the server
export const updateProductStatus = createAsyncThunk(
  'products/updateStatus',
  async ({ product_id, status }, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/json-data/updation-of-product/status-update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id, status }),
      });

      if (!res.ok) throw new Error('Update failed');

      return { product_id, status };
    } catch (error) {
      return rejectWithValue({ product_id, status }); // we'll use this to revert
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],        // all products
    loading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProductStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { product_id, status } = action.payload;
        const product = state.items.find(p => p.product_id === product_id);
        if (product) product.status = status;
      })
      .addCase(updateProductStatus.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;