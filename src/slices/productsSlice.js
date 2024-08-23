import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs } from "firebase/firestore";
import { productsCollection } from "../firebase/firestore";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const productsSnapshot = await getDocs(productsCollection);
    return productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
