import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../slices/ordersSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          await dispatch(fetchOrders(user.uid)).unwrap();
        } catch (err) {
          setError(
            "Failed to fetch orders. Please try again later.",
            err.message
          );
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  if (!user) {
    return <div>Please log in to see your orders.</div>;
  }

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="h-screen text-center">
      <h1 className=" font-semibold  text-lg">Order List</h1>
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.address}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
