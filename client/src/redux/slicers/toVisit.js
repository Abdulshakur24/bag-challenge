import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (slug) => {
    const response = await axios.get(
      `https://restcountries.com/v3.1/region/${slug}`
    );
    return response.data;
  }
);

export const toVisitSlice = createSlice({
  name: "toVisit",
  initialState: {
    data: [],
    status: "idle",
  },
  reducers: {
    loadHome: (state, { payload }) => {
      state.data = [...payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.status = "idle";
      })
      .addCase(fetchCountries.rejected, (state, { payload }) => {
        state.status = "error";
      });
  },
});

export const { loadhome } = toVisitSlice.actions;

export default toVisitSlice.reducer;
