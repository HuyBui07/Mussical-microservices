import { LogEntry } from "../models/logModel";

type State = {
  id: string;
  term: number;
  votedFor: string | null;
  latestLogIndex: number;
  leaderId: string | null;
  isLeader: boolean;
  peers: string[];
};

export const state: State = {
  id: process.env.SERVICE_ID as string,
  term: 0,
  votedFor: null,
  latestLogIndex: 0,
  leaderId: "service1",
  isLeader: process.env.SERVICE_ID == "service1",
  peers: process.env.PEERS?.split(",") ?? [],
};

export async function initializeState() {
  // Get the latest log index
  const latestLogEntry = await LogEntry.find().sort({ index: -1 }).limit(1);
  state.latestLogIndex = latestLogEntry.length > 0 ? latestLogEntry[0].index : 0;
  state.term = latestLogEntry.length > 0 ? latestLogEntry[0].term : 0;
}