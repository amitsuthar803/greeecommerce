import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">₹{item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => dispatch(increaseQuantity(item))}
                  className="px-2 py-1 border rounded bg-teal-700 text-white"
                >
                  +
                </button>
                <span className="px-4 py-1 border rounded">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(decreaseQuantity(item))}
                  className="px-2 py-1 border rounded bg-teal-700 text-white"
                >
                  -
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item))}
                  className="px-2 py-1 border rounded bg-red-700 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">
          Total: ₹{totalPrice.toFixed(2)}
        </h3>
        <Link to="/checkout">
          <button className="mt-4 px-4 py-2 bg-teal-700 text-white rounded">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
