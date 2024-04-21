import {
  change_complain_status_api,
  get_complains_api,
  update_complain_api,
} from "@func/api_functions";
const { createSlice } = require("@reduxjs/toolkit");

const initialData = {
  complains: [],
  totalComplains: 0,
  hasMore: true,
};

const initialState = {
  unsolved_complains: initialData,
  solved_complains: initialData,
  expired_complains: initialData,
  isError: false,
  isLoading: false,
};

const complainSlice = createSlice({
  name: "complain",
  initialState,
  reducers: {
    fetchComplainsStart: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    fetchComplainsSuccess: (state, action) => {
      const { status, data, page } = action.payload;
      const currentData = state[`${status}_complains`];
      state[`${status}_complains`].complains =
        page === 1
          ? data.complains
          : [...currentData.complains, ...data.complains];
      state[`${status}_complains`].hasMore =
        state[`${status}_complains`].complains.length < data.totalComplains;
      state[`${status}_complains`].totalComplains = data.totalComplains;
      state.isLoading = false;
      state.isError = false;
    },
    fetchComplainsFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    updateComplainStatus: (state, action) => {
      const { complain_id, status } = action.payload;
      const complain = state.unsolved_complains.complains.find(
        (complain) => complain.complain_id === complain_id
      );
      complain.status = status;
    },

    updateComplainData: (state, action) => {
      const { complain_id, complain } = action.payload;
      const c = state.unsolved_complains.complains.find(
        (complain) => complain.complain_id === complain_id
      );
      if (!c) return;
      Object.assign(c, complain);
      if (complain.status === "solved") {
        state.solved_complains.complains.push(complain);
        state.solved_complains.totalComplains += 1;
        state.unsolved_complains.complains =
          state.unsolved_complains.complains.filter(
            (complain) => complain.complain_id !== complain_id
          );
        state.unsolved_complains.totalComplains -= 1;
      }
    },
  },
});

export const {
  fetchComplainsStart,
  fetchComplainsSuccess,
  fetchComplainsFailure,
  updateComplainStatus,
  updateComplainData,
} = complainSlice.actions;

export default complainSlice.reducer;

export const fetchComplains =
  ({ store_id, status, page = 1, perPage = 5 }) =>
  async (dispatch, getState) => {
    dispatch(fetchComplainsStart());

    const [data, err] = await get_complains_api({
      store_id,
      status,
      page,
      perPage,
    });
    if (err) {
      dispatch(fetchComplainsFailure());
      return;
    }
    dispatch(fetchComplainsSuccess({ status, data, page }));
  };

export const changeComplainStatus =
  ({ complain_id, status = "unsolved" }) =>
  async (dispatch) => {
    const [data, err] = await change_complain_status_api({
      complain_id,
      status,
    });
    if (err) {
      dispatch(fetchComplainsFailure());
      return;
    }
    dispatch(updateComplainStatus({ complain_id, status }));
  };

export const updateComplain =
  ({ status, complain_id, optionSelected, vendor_refund_amount }) =>
  async (dispatch) => {
    dispatch(fetchComplainsStart());
    const [data, err] = await update_complain_api({
      status,
      complain_id,
      optionSelected,
      vendor_refund_amount,
    });
    if (err) {
      dispatch(fetchComplainsFailure());
      return;
    }
    dispatch(updateComplainData({ complain_id, complain: data.complain }));
  };
