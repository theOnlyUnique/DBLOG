import { createSlice } from "@reduxjs/toolkit";

// 为什么大驼峰不行
const globalSlice = createSlice({
	name: "global",
	initialState: {
		isLogin: false,
		isTeacher: false,
		clickNums: 0,
	},
	reducers: {
		setLogin(state, action) {
			state.isLogin = action.payload;
		},
		setTeacher(state, action) {
			state.isTeacher = action.payload;
		},
		addNums(state) {
			state.clickNums++;
		},
		reduce(state) {
			state.clickNums--;
		},
	},
});
export const { setLogin, setTeacher, addNums, reduce } = globalSlice.actions;
export default globalSlice.reducer;
