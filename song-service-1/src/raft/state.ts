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
