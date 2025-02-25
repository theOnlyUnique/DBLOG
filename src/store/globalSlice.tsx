import { createSlice } from "@reduxjs/toolkit";

// 为什么大驼峰不行
const globalSlice = createSlice({
	name: "global",
	initialState: {
		isLogin: false,
		isTeacher: false,
		clickNums: 0,
		articleId: -1
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
		setArticleId(state, action) {
			state.articleId = action.payload
		}
	},
});
export const { setLogin, setTeacher, addNums, reduce,setArticleId } = globalSlice.actions;
export default globalSlice.reducer;
