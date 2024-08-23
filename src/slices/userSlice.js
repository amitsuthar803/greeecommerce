import { createSlice } from "@reduxjs/toolkit";
import { signInWithGoogle, logout } from "../firebase/auth";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => ({
      uid: action.payload.uid,
      displayName: action.payload.displayName,
      email: action.payload.email,
    }),
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const loginUser = () => async (dispatch) => {
  try {
    const result = await signInWithGoogle();
    const user = result.user;
    dispatch(
      setUser({
        displayName: user.displayName,
        uid: user.uid,
        email: user.email,
      })
    );
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};

export const logoutUser = () => async (dispatch) => {
  await logout();
  dispatch(clearUser());
};

export default userSlice.reducer;
