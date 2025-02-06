export interface VoteRequest {
  term: number;
  candidateId: string;
}

export interface VoteResponse {
  term: number;
  voteGranted: boolean;
}

export interface Heartbeat {
  leaderId: string;
  term: number;
}
