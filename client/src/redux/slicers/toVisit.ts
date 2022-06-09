import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { thirdPartyAPI } from "src/utils/api";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (slug: string) => {
    const response = await thirdPartyAPI.get(`region/${slug}`);
    return response.data;
  }
);

export const toVisitSlice = createSlice({
  name: "toVisit",
  initialState: {
    data: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.status = "idle";
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default toVisitSlice.reducer;
