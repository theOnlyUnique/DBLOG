import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";
import demoReducer from "./demoSlice";
import testReducer from "./testSlice";

const globalStore = configureStore({
	reducer: {
		test: testReducer,
		demo: demoReducer,
		global: globalReducer,
	},
});

export type GlobalDispatch = typeof globalStore.dispatch;
export type GlobalState = ReturnType<typeof globalStore.getState>;

export default globalStore;
