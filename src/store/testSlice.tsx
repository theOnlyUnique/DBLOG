import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
	name: "test",
	initialState: {
		name: "test",
		age: 18,
	},
	reducers: {
		setName(state, action) {
			state.name = action.payload;
		},
		setAge(state, action) {
			state.age = action.payload;
		},
	},
});

//  getter 怎么写  setter怎么写
export const { setName, setAge } = testSlice.actions;
export default testSlice.reducer;
