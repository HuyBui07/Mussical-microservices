import mongoose from "mongoose";

export interface Playlist {
    name: string;
    user_id: string;
    songs: string[];
}

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user_id: { type: String, required: true },
    songs: { type: [String], required: true }
});

export default mongoose.model<Playlist>("Playlist", playlistSchema);