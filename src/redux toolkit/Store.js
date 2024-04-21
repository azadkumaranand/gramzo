import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { persistStore, persistReducer } from "redux-persist";
import vendorReducer from "./VendorSlice";
import productReducer from "./ProductSlice";
import orderReducer from "./OrderSlice";
import complainReducer from "./ComplainSlice";
import couponReducer from "./CouponSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // blacklist: ["ProductListed"], //Things you don't want to persist
};

const vendorConfig = {
  key: "vendor",
  storage: AsyncStorage,
};

const productConfig = {
  key: "product",
  storage: AsyncStorage,
};

const orderConfig = {
  key: "order",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  vendor: vendorReducer,
  product: productReducer,
  order: orderReducer,
  complain: complainReducer,
  coupon: couponReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
