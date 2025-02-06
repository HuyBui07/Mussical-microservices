import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import searchedSongsReducer from "../features/searchedSongsSlice";
import selectedSongReducer from "../features/selectedSongSlice";

const rootReducer = combineReducers({
  user: userReducer,
  searchedSongs: searchedSongsReducer,
  selectedSong: selectedSongReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;