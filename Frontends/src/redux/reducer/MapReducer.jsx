import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  location: {
    lat: null,
    lon: null,
  },
  address: null,
}

export const mapReducer = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setLocation: (state, action) => {
        const { lat, lon } = action.payload
        state.location.lat=lat
        state.location.lon=lon
    },

    setAddress: (state, action) => {
        state.address = action.payload
    } 
  },
})

// Action creators are generated for each case reducer function
export const { setLocation, setAddress } = mapReducer.actions
export default mapReducer.reducer