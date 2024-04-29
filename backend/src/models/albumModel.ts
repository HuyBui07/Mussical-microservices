import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  songs: { type: [String], required: true }
});

export default mongoose.model("Album", playlistSchema);
