import { Request, Response } from "express";
import RaftNode from "./RaftNode";
import { State } from "./RaftNode";

const raftNode = new RaftNode();

export const requestVote = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { candidateId, term } = req.body;

  // If the candidate's term is greater than the current term, then vote for the candidate
  if (term > raftNode.getTerm()) {
    const success = raftNode.approveVote(candidateId, term);

    if (success) {
      res.status(200).json({ voteGranted: true, fromPort: raftNode.getPort() });
      return;
    }
  }

  res.status(200).json({ voteGranted: false, fromPort: raftNode.getPort() });
};

export const appendEntries = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { term, entries } = req.body;
  const success = raftNode.appendEntries(term, entries);

  if (success) {
    res
      .status(200)
      .json({ message: "Entries appended from " + raftNode.getPort() });
    return;
  }
};
