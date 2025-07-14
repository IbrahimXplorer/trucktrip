import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Trip {
  date: string;
  loadLocation: string;
  unloadLocation: string;
}

interface TripState {
  trips: Trip[];
}

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
