import { createSlice } from "@reduxjs/toolkit";

const demoSlice = createSlice({
	name: "demo",
	initialState: {
		myCount: 0,
	},
	reducers: {
		increment: (state) => {
			state.myCount += 1;
		},
		decrement: (state) => {
			state.myCount -= 1;
		},
	},
});

export const { increment, decrement } = demoSlice.actions;
export default demoSlice.reducer;