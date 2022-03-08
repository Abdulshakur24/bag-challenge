import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'
const token = localStorage.getItem('token')

const axios = Axios.create({
  baseURL: isProduction
    ? 'https://bag-challenge-2022.herokuapp.com/api/list'
    : 'http://localhost:5010/api/list/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const postList = createAsyncThunk('list/post', async (object) => {
  const response = await axios.post('/post', object)
  return response.data
})

export const fetchAllList = createAsyncThunk('list', async () => {
  const response = await axios.get('/all')
  return response.data
})

export const updateList = createAsyncThunk(
  'list/update',
  async ({ id, visited }) => {
    const response = await axios.patch(`update/${id}`, { visited: !visited })
    return response.data
  },
)

export const deleteList = createAsyncThunk('list/delete', async (id) => {
  const response = await axios.delete(`delete/${id}`)
  return response.data
})

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    data: [],
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder
      .addCase(postList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(postList.fulfilled, (state, { payload }) => {
        const data = payload
        const index = state.data.findIndex((e) => e._id === data._id)
        index === -1
          ? (state.data = [...state.data, data])
          : (state.data[index] = data)
        state.status = 'idle'
      })
      .addCase(postList.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(fetchAllList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllList.fulfilled, (state, { payload }) => {
        state.data = payload
        state.status = 'idle'
      })
      .addCase(updateList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateList.fulfilled, (state, { payload }) => {
        state.data.forEach((object) => {
          if (object._id === payload.id) {
            object.visited = payload.visited
          }
        })
        state.status = 'idle'
      })
      .addCase(updateList.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(fetchAllList.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(deleteList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteList.fulfilled, (state, { payload }) => {
        const index = state.data.findIndex((e) => e._id === payload.id)
        if (index > -1) {
          state.data.splice(index, 1)
        }
      })
      .addCase(deleteList.rejected, (state) => {
        state.status = 'error'
      })
  },
})

export default listSlice.reducer
