import mongoose, { Schema, Document } from 'mongoose';

export interface Song {
    title: string;
    artist: string;
    file_id: string;
};

const songSchema: Schema = new Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    file_id: { type: String, required: true },
});

export default mongoose.model<Song>('Song', songSchema);