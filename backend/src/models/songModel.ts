import mongoose, { Schema, Document } from "mongoose";
import { HistoryRecord } from "./historyRecord";
import userModel from "./userModel";
import { stringify } from "querystring";
export interface Song {
  _id: string;
  title: string;
  artist: string;
  source: string;
  poster: string;
  listenCount?: number;
  tags: string[];
  dateCreated?: Date;
}

const songSchema: Schema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  source: { type: String, required: true },
  poster: { type: String, required: true },
  listenCount: { type: Number, required: false, default: 0 },
  tags: { type: [String], required: false, default: [] },
  dateCreated: { type: Date, required: false, default: Date.now },
});
// After a song is deleted, remove all related history records and update the user history
const deleteRelatedHistory = async function (doc: Song) {
  const HistoryRecord = mongoose.model("HistoryRecord");
  const User = mongoose.model("User");

  console.log("Removing history records for song", doc._id);

  // Find all related history records
  const historyRecords = await HistoryRecord.find({ songId: doc._id });

  // Delete all related history records
  await HistoryRecord.deleteMany({ songId: doc._id });

  // For each history record, remove the reference from the corresponding user's history
  for (const record of historyRecords) {
    await User.updateMany(
      { history: record._id },
      { $pull: { history: record._id } }
    );
  }
};

songSchema.post("findOneAndDelete", deleteRelatedHistory);
songSchema.post(
  "deleteOne",
  { document: true, query: false },
  deleteRelatedHistory
);
songSchema.post("deleteMany", deleteRelatedHistory);
export default mongoose.model<Song>("Song", songSchema);
