// src/Store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./RootReducer";
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;