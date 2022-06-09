import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postVisitProps } from "src/types/defaults";
import { restfulAPI } from "src/utils/api";

export const postList = createAsyncThunk(
  "list/post",
  async ({ object, token }: postVisitProps) => {
    const response = await restfulAPI.post("list/post", object, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchAllList = createAsyncThunk("list", async (token: string) => {
  const response = await restfulAPI.get("list/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const updateList = createAsyncThunk(
  "list/update",
  async ({
    id,
    visited,
    token,
  }: {
    id: string;
    visited: boolean;
    token: string;
  }) => {
    const response = await restfulAPI.patch(
      `list/update/${id}`,
      { visited: !visited },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

export const deleteList = createAsyncThunk(
  "list/delete",
  async ({ id, token }: { id: string; token: string }) => {
    const response = await restfulAPI.delete(`list/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState: {
    data: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postList.fulfilled, (state, { payload }) => {
        const data = payload;
        const index = state.data.findIndex((e) => e._id === data._id);
        index === -1
          ? (state.data = [...state.data, data])
          : (state.data[index] = data);
        state.status = "idle";
      })
      .addCase(postList.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchAllList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllList.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.status = "idle";
      })
      .addCase(updateList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateList.fulfilled, (state, { payload }) => {
        const array = state.data;
        for (let i = 0; i < array.length; i++) {
          if (array[i]._id === payload.id) {
            array[i].visited = payload.visited;
            break;
          }
        }
        state.status = "idle";
      })
      .addCase(updateList.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchAllList.rejected, (state) => {
        state.status = "error";
      })
      .addCase(deleteList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteList.fulfilled, (state, { payload }) => {
        const index = state.data.findIndex((e) => e._id === payload.id);
        if (index > -1) {
          state.data.splice(index, 1);
        }
        state.status = "idle";
      })
      .addCase(deleteList.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default listSlice.reducer;
