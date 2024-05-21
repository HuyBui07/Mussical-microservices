import mongoose from "mongoose";

export interface HistoryRecord {
  userId: string;
  songId: string;
  dateListened: Date;
}

const HistoryRecordSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  songId: { type: String, required: true },
  dateListened: { type: Date, required: false, default: Date.now },
});

export default mongoose.model<HistoryRecord>(
  "HistoryRecord",
  HistoryRecordSchema
);
