import { createSlice } from "@reduxjs/toolkit";
export type SongData = {
    _id: number;
    title: string;
    artist: string;
    source: string;
    poster: string;
};

export const searchedSongsSlice = createSlice({
  name: "searchedSongs",
  initialState: {
    songs: [] as SongData[],
  },
  reducers: {
    addSongs: (state, action) => {
      state.songs = action.payload;
    },
  },
});

export const { addSongs } = searchedSongsSlice.actions;

export default searchedSongsSlice.reducer;