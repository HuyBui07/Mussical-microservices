import mongoose, { Schema, Document } from 'mongoose';

export interface Song {
    title: string;
    artist: string;
    source: string;
    poster: string;
};

const songSchema: Schema = new Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    source: { type: String, required: true },
    poster: { type: String, required: true }
});

export default mongoose.model<Song>('Song', songSchema);