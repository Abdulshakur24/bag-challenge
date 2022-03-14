import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

const axios = Axios.create({
  baseURL: isProduction
    ? 'https://bag-challenge-2022.herokuapp.com/api/visit'
    : 'http://localhost:5010/api/visit/',
})

export const postVisit = createAsyncThunk(
  'visit/post',
  async ({ object, token }) => {
    const response = await axios.post('/post', object, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  },
)

export const fetchAllVisits = createAsyncThunk('visits', async (token) => {
  const response = await axios.get('/all', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
})

export const visitSlice = createSlice({
  name: 'visit',
  initialState: {
    data: [],
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder
      .addCase(postVisit.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(postVisit.fulfilled, (state, { payload }) => {
        const data = payload
        const index = state.data.findIndex((e) => e._id === data._id)
        index === -1
          ? (state.data = [...state.data, data])
          : (state.data[index] = data)
        state.status = 'idle'
      })
      .addCase(postVisit.rejected, (state) => {
        state.status = 'error'
      })
      .addCase(fetchAllVisits.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllVisits.fulfilled, (state, { payload }) => {
        state.data = payload
        state.status = 'idle'
      })
      .addCase(fetchAllVisits.rejected, (state) => {
        state.status = 'error'
      })
  },
})

export default visitSlice.reducer
