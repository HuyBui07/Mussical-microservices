import { LogEntry } from "./../models/logModel";
import { Request, Response } from "express";
import { state } from "./state";
import startElection from "./election";
import { processLogEntry } from "./processLogEntry";

// Store the timeout ID
let heartbeatTimeout: NodeJS.Timeout | null = null;

function handleHeartbeatFromLeader(req: Request, res: Response) {
  const { leaderId, term } = req.body;

  if (state.leaderId !== leaderId) {
    console.log(`Leader updated to ${leaderId}`);
    state.leaderId = leaderId;
  }

  if (state.term !== term) {
    console.log(`Term updated to ${term}`);
    state.term = term;
  }

  // Clear the existing timeout if it exists
  if (heartbeatTimeout) {
    clearTimeout(heartbeatTimeout);
  }

  // Set a new timeout
  heartbeatTimeout = setTimeout(() => {
    console.error("Leader heartbeat timeout. Starting new election.");
    // Handle leader timeout (e.g., start a new election)
    startElection();
  }, 20000);

  console.log(`Heartbeat received from leader ${leaderId}. Timeout reset.`);
  res.status(200).send("Heartbeat received");
}

function handleVoteRequest(req: Request, res: Response) {
  const { term, candidateId } = req.body;
  if (term < state.term) {
    res.json({ term: state.term, voteGranted: false });
  } else if (state.votedFor === null || state.votedFor === candidateId) {
    state.votedFor = candidateId;
    state.term = term;
    res.json({ term: state.term, voteGranted: true });
  } else {
    res.json({ term: state.term, voteGranted: false });
  }
}

async function handleAppendEntry(req: Request, res: Response) {
  try {
    const logEntry = new LogEntry(req.body.logEntry);

    await logEntry.save();

    console.log(`Log entry saved: ${logEntry}`);
    res.status(201).send("Log entry saved");
  } catch (error) {
    console.error("Error handling append entry:", error);
    res.status(500).send("Error handling append entry");
  }
}

async function handleCommitEntry(req: Request, res: Response) {
  const { index, term } = req.body;
  try {
    const logEntry = await LogEntry.findOne({ index, term });

    if (!logEntry) {
      console.error(`Log entry not found for index ${index} and term ${term}`);
      res.status(404).send("Log entry not found");
      return;
    }

    logEntry.status = "committed";

    processLogEntry(logEntry);

    await logEntry.save();

    console.log(`Log entry committed: ${logEntry}`);
    res.status(200).send("Log entry committed");
  } catch (error) {
    console.error("Error handling commit entry:", error);
    res.status(500).send("Error handling commit entry");
  }
}

export {
  handleHeartbeatFromLeader,
  handleVoteRequest,
  handleAppendEntry,
  handleCommitEntry,
};
