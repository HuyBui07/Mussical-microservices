import { requestVote } from './raftController';
// State
export enum State {
  FOLLOWER = "follower",
  CANDIDATE = "candidate",
  LEADER = "leader",
}

class RaftNode {
  private port: string;
  private state: State;
  private term: number;
  private votedFor: string | null;
  private log: Array<{ term: number; command: string }>;

  constructor() {
    this.port = process.env.PORT as string;
    this.state = State.FOLLOWER;
    this.term = 0;
    this.votedFor = null;
    this.log = [];
  }

  public getPort(): string {
    return this.port;
  }

  public getState(): string {
    return this.state;
  }

  public setState(state: State): void {
    this.state = state;
  }

  public getTerm(): number {
    return this.term;
  }

  public setTerm(term: number): void {
    this.term = term;
  }

  public getVotedFor(): string | null {
    return this.votedFor;
  }

  public setVotedFor(votedFor: string | null): void {
    this.votedFor = votedFor;
  }

  public hasVotedInCurrentTerm(): boolean {
    return this.votedFor !== null;
  }

  public approveVote(candidateId: string, term: number): boolean {
    if (term > this.term) {
      this.term = term;
      this.votedFor = candidateId;
      this.state = State.FOLLOWER;
      return true;
    }
    return false;
  }
  
  public appendEntries(
    term: number,
    entries: Array<{ term: number; command: string }>
  ): boolean {
    if (term >= this.term) {
      this.term = term;
      this.state = State.FOLLOWER;
      this.log.push(...entries);
      return true;
    }
    return false;
  }

  public getLastLogIndex(): number {
    return this.log.length - 1;
  }

  public getLastLogTerm(): number {
    return this.log[this.getLastLogIndex()].term;
  }

  public isLogUpToDate(
    candidateLastLogIndex: number,
    candidateLastLogTerm: number
  ): boolean {
    const lastLogIndex = this.getLastLogIndex();
    const lastLogTerm = this.getLastLogTerm();
    return (
      candidateLastLogTerm > lastLogTerm ||
      (candidateLastLogTerm === lastLogTerm &&
        candidateLastLogIndex >= lastLogIndex)
    );
  }
}

export default RaftNode;
