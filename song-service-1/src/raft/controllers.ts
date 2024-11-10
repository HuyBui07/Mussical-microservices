import { Request, Response } from "express";
import { state } from "./state";

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

export { handleVoteRequest };