import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { ordersCollection } from "../firebase/firestore";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId) => {
    const ordersQuery = query(ordersCollection, where("userId", "==", userId));
    const ordersSnapshot = await getDocs(ordersQuery);
    return ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ orderDetails, cartItems, address, userId }) => {
    const order = {
      userId: userId,
      ...orderDetails,
      items: cartItems,
      date: new Date().toISOString(),
      address: address,
    };
    await addDoc(ordersCollection, order);
    return order;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default ordersSlice.reducer;
