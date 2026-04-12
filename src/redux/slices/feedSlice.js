import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    setFeed: (state, action) => action.payload,

    addFeed: (state, action) => {
      state.push(...action.payload);
    },

    insertUserAtIndex: (state, action) => {
      const { user, index } = action.payload;
      state.splice(index, 0, user);
    },

    removeUserFromFeed: (state, action) => {
      return state.filter(user => user._id !== action.payload);
    },
  },
});

export const {
  setFeed,
  addFeed,
  insertUserAtIndex,
  removeUserFromFeed,
} = feedSlice.actions;

export default feedSlice.reducer;