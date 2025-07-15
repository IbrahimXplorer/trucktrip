import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Trip, TripState } from '../../types/trip';


const initialState: TripState = {
  trips: [],
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    addTrip: (state, action: PayloadAction<Trip>) => {
      state.trips.push(action.payload);
    },
    clearTrips: state => {
      state.trips = [];
    },
  },
});

export const { addTrip, clearTrips } = tripSlice.actions;
export default tripSlice.reducer;
