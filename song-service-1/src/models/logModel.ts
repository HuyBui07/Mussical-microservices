import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  method: String,
  url: String,
  headers: Object,
  body: Object,
  status: { type: String, default: 'appended' },
  timestamp: { type: Date, default: Date.now },
  index: { type: Number, required: true }, // Index for Raft log entry
  term: { type: Number, required: true }, // Term number for Raft log entry
});

export const LogEntry = mongoose.model('LogEntry', logSchema);