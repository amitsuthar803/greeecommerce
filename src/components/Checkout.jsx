import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../slices/ordersSlice";
import { clearCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.user.uid);

  const handlePlaceOrder = () => {
    if (address.trim() === "") {
      alert("Please enter your address.");
      return;
    }

    dispatch(placeOrder({ address, cartItems, userId }))
      .unwrap()
      .then(() => {
        dispatch(clearCart());
        navigate("/orders");
      })
      .catch((error) => {
        console.error("Error placing order:", error.message);
        alert("Failed to place the order. Please try again.");
      });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="mt-1 block py-2 px-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          onClick={handlePlaceOrder}
          disabled={address.trim() === ""}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
