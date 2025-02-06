import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SongData = {
  _id: number;
  title: string;
  artist: string;
  source: string;
  poster: string;
};

export const selectedSongSlice = createSlice({
  name: "selectedSong",
  initialState: null as SongData | null,
  reducers: {
    setSelectedSong: (state, action: PayloadAction<SongData | null>) => {
      console.log("Selected song updated:", action.payload);
      return action.payload; // Correctly update the state
    },
  },
});

export const { setSelectedSong } = selectedSongSlice.actions;

export default selectedSongSlice.reducer;