import {
  add_payment_settings_api,
  add_vendor_story,
  change_store_status_api,
} from "@func/api_functions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  store: null,
  isError: false,
  isLoading: false,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    setStore: (state, action) => {
      state.store = { ...state.store, ...action.payload };
    },

    vendorLogout: (state) => initialState,

    fetchApiStart: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    fetchApiSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
    },

    fetchApiError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {
  setCurrentUser,
  setStore,
  vendorLogout,
  fetchApiStart,
  fetchApiSuccess,
  fetchApiError,
} = vendorSlice.actions;

export default vendorSlice.reducer;

export const changeStoreStatus = () => async (dispatch, getState) => {
  const { store } = getState().vendor;
  const store_id = store._id;
  dispatch(fetchApiStart());
  const [data, error] = await change_store_status_api(store_id);

  if (error) {
    dispatch(fetchApiError());
    return true;
  }
  dispatch(fetchApiSuccess());
  dispatch(setStore(data.store));
};

export const addPaymentSetting = (body) => async (dispatch, getState) => {
  const { store } = getState().vendor;
  const store_id = store._id;
  dispatch(fetchApiStart());
  const [data, error] = await add_payment_settings_api({
    store_id,
    ...body,
  });
  if (error) return dispatch(fetchApiError());
  if (data) {
    // console.log(data);
    dispatch(fetchApiSuccess());
    dispatch(setStore(data.store));
  }
};

export const addVendorStory = (body) => async (dispatch, getState) => {
  const { user } = getState().vendor;
  const userId = user?._id;
  const [data, error] = await add_vendor_story({
    vendor_id: userId,
    ...body,
  });
  if (error) return;
  if (data) {
    // console.log(data);
    dispatch(setCurrentUser(data?.vendor));
  }
};
