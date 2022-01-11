import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "data/fetch",
  async (value = "", thunkAPI) => {
    try {
      const response = await axios.get(`https://rocket-sales-backend.herokuapp.com/api/leads?search=${value}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const dataSlice = createSlice({
  name: "trade",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.loading = true;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

const selectDataState = (state) => state.trade;
const selectStatusesState = (state) => state.trade.data.pipelines;
const selectUsersState = (state) => state.trade.data.users;
const selectContactsState = (state) => state.trade.data.contacts;

export const selectStatusById = ({ statusId, pipelineId }) =>
  createSelector(selectStatusesState, (state) => {
    const pipeline = state.find((pipeline) => pipeline.id === pipelineId);
    return pipeline._embedded.statuses.find((status) => status.id === statusId);
  });

export const selectUserById = (id) =>
  createSelector(selectUsersState, (state) =>
    state.find((user) => user.id === id)
  );

export const selectContactById = (arr) =>
  createSelector(selectContactsState, (state) =>
    state.filter((contact) => arr.some((item) => item.id === contact.id))
  );

export const selectLoading = createSelector(
  selectDataState,
  (state) => state.loading
);

export const selectData = createSelector(
  selectDataState,
  (state) => state.data
);

export default dataSlice.reducer;
