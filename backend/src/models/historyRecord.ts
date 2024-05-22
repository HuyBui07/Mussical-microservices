import mongoose from "mongoose";

export interface HistoryRecord {
  userId: string;
  songId: string;
  dateListened: Date;
}

const HistoryRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  songId: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
  dateListened: { type: Date, required: false, default: Date.now },
});

export default mongoose.model<HistoryRecord>(
  "HistoryRecord",
  HistoryRecordSchema
);
