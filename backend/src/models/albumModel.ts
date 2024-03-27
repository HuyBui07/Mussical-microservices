import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  songs: { type: [String], required: true },
  cover_url: { type: String, required: true },
});

export default mongoose.model("Album", playlistSchema);
