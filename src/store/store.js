import persistReducer from "redux-persist/lib/persistReducer";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productsSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/lib/persistStore";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["products"]
};

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions that contain non-serializable values
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
      // Optional but recommended: ignore thunk actions (they contain functions)
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
