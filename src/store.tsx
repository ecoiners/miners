import { configureStore } from "@reduxjs/toolkit";
import BaseApi from "./baseapi";

const store = configureStore({
	reducer: {
		[BaseApi.reducerPath]: BaseApi.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(BaseApi.middleware)
});

export default store;