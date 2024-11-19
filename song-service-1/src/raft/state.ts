type State = {
  id: string;
  term: number;
  votedFor: string | null;
  log: any[];
  leaderId: string | null;
  isLeader: boolean;
  peers: string[];
};

export const state: State = {
  id: process.env.SERVICE_ID as string,
  term: 0,
  votedFor: null,
  log: [],
  leaderId: "service1",
  isLeader: process.env.SERVICE_ID == "service1",
  peers: process.env.PEERS?.split(",") ?? [],
};