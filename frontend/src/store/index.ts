import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import searchedSongsReducer from "../features/searchedSongsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  searchedSongs: searchedSongsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;