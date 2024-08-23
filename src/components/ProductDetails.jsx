// src/components/ProductDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();

  const product = useSelector((state) =>
    state.products.find((p) => p.id === Number(id))
  );
  const dispatch = useDispatch();

  if (!product) return <p>Product not found</p>;

  return (
    <div className="flex h-screen justify-center mt-10 ">
      <div className="">
        <img src={product.imageUrl} className="w-[80%]" alt="" />
      </div>
      <div className="w-1/3">
        <h1 className=" font-semibold mb-3">{product.name}</h1>
        <span className="">Discription:</span>
        <p className=" font-semibold">{product.description}</p>
        <p className="mt-5 text-lg font-semibold">₹{product.price}</p>
        <button
          className="mt-5 bg-teal-700 text-white px-4 py-2"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
