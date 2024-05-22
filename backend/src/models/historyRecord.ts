import mongoose from "mongoose";

export interface HistoryRecord {
  _id: string;
  userId: string;
  songId: string;
  dateListened: Date;
}

const HistoryRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  songId: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
  dateListened: { type: Date, required: false, default: Date.now },
});

//After: add a history record id to user model after being created
HistoryRecordSchema.post("save", async function (doc: HistoryRecord) {
  const User = mongoose.model("User");
  console.log("Adding history record to user", doc.userId);
  await User.updateOne({ _id: doc.userId }, { $push: { history: doc._id } });
});

export default mongoose.model<HistoryRecord>(
  "HistoryRecord",
  HistoryRecordSchema
);
