export interface Trip {
  date: string;
  loadLocation: string;
  unloadLocation: string;
}

export interface TripState {
  trips: Trip[];
}
