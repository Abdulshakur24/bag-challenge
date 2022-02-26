import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://restcountries.com/v3.1/region/europe'

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await axios.get(url)
    return response.data
  },
)

export const toVisitSlice = createSlice({
  name: 'toVisit',
  initialState: {
    data: [],
    status: 'idle',
  },
  reducers: {
    loadHome: (state, { payload }) => {
      state.data = [...payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCountries.fulfilled, (state, { payload }) => {
        state.data = payload
        state.status = 'idle'
      })
      .addCase(fetchCountries.rejected, (state, { payload }) => {
        state.status = 'error'
      })
  },
})

export const { loadhome } = toVisitSlice.actions

export default toVisitSlice.reducer
