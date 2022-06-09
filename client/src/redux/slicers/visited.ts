import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postVisitProps } from "src/types/defaults";
import { restfulAPI } from "src/utils/api";

export const postVisit = createAsyncThunk(
  "visit/post",
  async ({ object, token }: postVisitProps) => {
    const response = await restfulAPI.post("visit/post", object, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchAllVisits = createAsyncThunk(
  "visits",
  async (token: string) => {
    const response = await restfulAPI.get("visit/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const visitSlice = createSlice({
  name: "visit",
  initialState: {
    data: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postVisit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postVisit.fulfilled, (state, { payload }) => {
        const data = payload;
        const index = state.data.findIndex((e) => e._id === data._id);
        index === -1
          ? (state.data = [...state.data, data])
          : (state.data[index] = data);
        state.status = "idle";
      })
      .addCase(postVisit.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchAllVisits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllVisits.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.status = "idle";
      })
      .addCase(fetchAllVisits.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default visitSlice.reducer;
