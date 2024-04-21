const { createSlice } = require("@reduxjs/toolkit");
import { BASE_URL, DEV_URL, testvar } from "../constants/api";

const initialState = {
  coupons: [],
  quickCoupons: [],
  totalCoupons: 0,
  isLoading: false,
  isError: false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    fetchCouponSuccess(state, action) {
      (state.coupons = action.payload.coupons),
        (state.totalCoupons = action.payload.totalCoupons);
      state.isLoading = false;
    },
    fetchingFailed(state, action) {
      (state.isLoading = false), (state.isError = true);
    },
    fetchCoupons(state, action) {
      state.coupons = action.payload.coupons;
      state.totalCoupons = action.payload.count;
      //   state.totalCoupons = state.totalCoupons + action.payload.coupons.length;
    },
    fetchQuickCoupons: (state, action) => {
      state.quickCoupons = action.payload.quickCoupons;
      // state.ProductListed = action.payload.offerings;
    },
    updateQuickCoupons: (state, action) => {
      state.quickCoupons.map((coupon) => {
        if (coupon._id === action.payload.quickCouponId) {
          let index = state.quickCoupons.findIndex(function (item) {
            return item._id === action.payload.quickCouponId;
          });
          if (index > -1) {
            state.quickCoupons.splice(index, 1);
          }
        }
      });
      state.quickCoupons;
    },
    addCouponSuccess: (state, action) => {
      return {
        ...state,
        totalCoupons: state.totalCoupons + 1,
        coupons: [action.payload.coupon, ...state.coupons],
      };
    },
    deleteCouponSuccess: (state, action) => {
      state.coupons.map((coupon) => {
        if (coupon._id === action.payload.couponId) {
          let index = state.coupons.findIndex(function (item) {
            return item._id === action.payload.couponId;
          });
          if (index > -1) {
            state.coupons.splice(index, 1);
          }
        }
      });
    },
    changeCouponStatusReducer: (state, action) => {
      state.coupons.map((coupon) => {
        if (coupon._id === action.payload.couponId) {
          let index = state.coupons.findIndex(function (item) {
            return item._id === action.payload.couponId;
          });
          if (index > -1) {
            state.coupons[index].status = action.payload.status;
          }
        }
      });
    },
    updateCouponSuccess: (state, action) => {
      state.coupons.map((coupon) => {
        if (coupon._id === action.payload.coupon._id) {
          let index = state.coupons.findIndex(function (item) {
            return item._id === action.payload.coupon._id;
          });
          if (index > -1) {
            state.coupons[index] = action.payload.coupon;
          }
        }
      });
    },
  },
});

export const {
  fetchCouponSuccess,
  fetchingFailed,
  fetchCoupons,
  fetchQuickCoupons,
  updateQuickCoupons,
  addCouponSuccess,
  updateCouponSuccess,
  deleteCouponSuccess,
  changeCouponStatusReducer,
} = couponSlice.actions;
export default couponSlice.reducer;

export const addCoupon = (couponData) => {
  return async (dispatch, getState) => {
    try {
      //   console.log({ ...couponData });
      const res = await fetch(
        `${testvar ? DEV_URL : BASE_URL}/a/coupon/addcoupon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...couponData,
          }),
        }
      );

      const resjson = await res.json();
      console.log(resjson);
      if (resjson?.msg === "Success") {
        if (resjson.type === "add")
          dispatch(addCouponSuccess({ coupon: resjson.coupon }));
        else if (resjson.type === "update")
          dispatch(updateCouponSuccess({ coupon: resjson.coupon }));
        if (couponData?.quickCouponId) {
          dispatch(
            updateQuickCoupons({ quickCouponId: couponData.quickCouponId })
          );
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(fetchingFailed());
    }
  };
};

export const getCoupons = (store_id, vendor_id) => {
  return async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${testvar ? DEV_URL : BASE_URL}/a/coupon/getStoreCoupons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            store_id: store_id,
            vendor_id: vendor_id,
          }),
        }
      );
      const resjson = await res.json();
      if (resjson?.msg === "Success") {
        dispatch(
          fetchCoupons({ coupons: resjson.coupons, count: resjson.count })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getQuickCoupons = (store_id) => {
  return async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${testvar ? DEV_URL : BASE_URL}/a/quickCoupons/getQuickCoupons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ store_id: store_id }),
        }
      );
      const resjson = await res.json();
      dispatch(fetchQuickCoupons({ quickCoupons: resjson.quickCoupons }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteCoupon = (store_id, couponId) => {
  return async (dispatch, getState) => {
    if (!store_id || !couponId) return;
    try {
      const res = await fetch(
        `${testvar ? DEV_URL : BASE_URL}/a/coupon/deletecoupon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ store_id: store_id, couponId: couponId }),
        }
      );
      const resjson = await res.json();
      //   console.log("resj", resjson);
      if (resjson?.status === "Success") {
        dispatch(deleteCouponSuccess({ couponId: couponId }));
      }
    } catch (err) {
      console.log("delete cp", err);
    }
  };
};

export const changeCouponStatus = (couponId, store_id, status) => {
  return async (dispatch, getState) => {
    if (!store_id || !couponId) return;

    try {
      const res = await fetch(
        `${testvar ? DEV_URL : BASE_URL}/a/coupon/updatecouponstatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            store_id: store_id,
            couponId: couponId,
            status: status,
          }),
        }
      );
      const resjson = await res.json();
      //   console.log("resj", resjson);
      if (resjson?.status === "Success") {
        dispatch(
          changeCouponStatusReducer({ couponId: couponId, status: status })
        );
      }
    } catch (err) {
      console.log("delete p", err);
    }
  };
};
