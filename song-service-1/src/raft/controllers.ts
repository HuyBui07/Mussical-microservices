import { Request, Response } from "express";
import { state } from "./state";
import startElection from "./election";

// Store the timeout ID
let heartbeatTimeout: NodeJS.Timeout | null = null;

function handleHeartbeatFromLeader(req: Request, res: Response) {
  const {leaderId, term} = req.body;

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
  }, 15000); 

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


export { handleHeartbeatFromLeader, handleVoteRequest };
