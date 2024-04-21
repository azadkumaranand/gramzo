import { createSlice } from "@reduxjs/toolkit";
import { get_orders_api } from "../functions/api_functions";

//["received", "accepted", "processed", "pickup_done", "out_for_delivery", "delivered", "cancelled"]
const initialOrderState = {
  orders: [],
  totalOrders: 0,
  hasMore: true,
};

const initialState = {
  received_orders: initialOrderState,
  accepted_orders: initialOrderState,
  processed_orders: initialOrderState,
  pickup_done_orders: initialOrderState,
  out_for_delivery_orders: initialOrderState,
  delivered_orders: initialOrderState,
  cancelled_orders: initialOrderState,
  isError: false,
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    fetchOrdersSuccess: (state, action) => {
      const { status, data, page, perPage } = action.payload;
      const currentOrder = state[`${status}_orders`];
      state[`${status}_orders`].orders =
        page === 1 ? data.orders : [...currentOrder.orders, ...data.orders];
      state[`${status}_orders`].hasMore =
        state[`${status}_orders`].orders.length < data.totalOrders;
      state[`${status}_orders`].totalOrders = data.totalOrders;
      state.isError = false;
      state.isLoading = false;
    },
    fetchOrdersFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    acceptOrder: (state, action) => {
      const acceptedOrder = action.payload;
      const order = state.received_orders.orders.find(
        (order) => order._id === acceptedOrder._id
      );
      state.received_orders.orders = state.received_orders.orders.filter(
        (order) => order._id !== acceptedOrder._id
      );
      state.received_orders.totalOrders -= 1;
      state.accepted_orders.orders.unshift(order);
      state.accepted_orders.totalOrders += 1;
    },
    rejectOrder: (state, action) => {
      const rejectedOrder = action.payload;
      const order = state.received_orders.orders.find(
        (order) => order._id === rejectedOrder._id
      );
      state.received_orders.orders = state.received_orders.orders.filter(
        (order) => order._id !== rejectedOrder._id
      );
      state.received_orders.totalOrders -= 1;
      state.cancelled_orders.orders.unshift(order);
      state.cancelled_orders.totalOrders += 1;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  acceptOrder,
  rejectOrder,
} = orderSlice.actions;

export default orderSlice.reducer;

export const fetchOrders =
  ({ store_id, status, page = 1, perPage = 12, startDate, endDate }) =>
  async (dispatch) => {
    dispatch(fetchOrdersStart());
    const filter = {
      store_id: "65493e19f38d17900f63d220",
      status,
      page,
      perPage,
      startDate,
      endDate,
    };
    if (startDate && endDate && startDate < endDate) {
      filter.startDate = startDate;
      filter.endDate = endDate;
    }
    const [data, error] = await get_orders_api(filter);
    if (error) {
      dispatch(fetchOrdersFailure());
    } else {
      dispatch(fetchOrdersSuccess({ status, data, page, perPage }));
    }
  };
