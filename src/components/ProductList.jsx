import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
import { addToCart } from "../slices/cartSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await dispatch(fetchProducts());
      setLoading(false);
    };

    loadProducts();
  }, [dispatch]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center flex-col">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div className="grid grid-cols-3 mt-5 items-center justify-center gap-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center bg-white p-4 border rounded shadow-lg"
              >
                <Link
                  to={`/products/${product.id}`}
                  className="flex flex-col items-center"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-[50%] h-auto mb-4"
                  />
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
                </Link>

                <button
                  className="bg-teal-600 text-white px-10 py-2 mt-2 rounded hover:bg-teal-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addToCart(product));
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
