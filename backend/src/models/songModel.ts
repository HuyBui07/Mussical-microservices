import mongoose, { Schema, Document } from 'mongoose';

export interface Song {
    id: number;
    title: string;
    artist: string;
    file_path: string;
};

const songSchema: Schema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    file_path: { type: String, required: true },
});

export default mongoose.model<Song>('Song', songSchema);