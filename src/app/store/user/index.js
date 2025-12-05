import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: "",
  name: "",
  email: "",
  phone_number: "",
  user_type: "",
  avatar:"",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
