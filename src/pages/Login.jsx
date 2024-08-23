import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    dispatch(loginUser());
  };

  return (
    !user && (
      <div className="flex items-center justify-center h-screen">
        <button
          className=" bg-teal-700 text-white px-5 py-2 rounded-lg "
          onClick={handleLogin}
        >
          Login with Google
        </button>
      </div>
    )
  );
};

export default Login;
