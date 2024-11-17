import { state } from "./state";

async function startElection() {
  const randomTimeout = 150 + Math.floor(Math.random() * 150); // Random timeout between 150ms and 300ms
  setTimeout(() => {
    console.log(
      `Node ${state.id} starting election for term ${state.term + 1}`
    );
    startElection();
  }, randomTimeout);

  state.term += 1;
  state.votedFor = state.id;
  let votes = 1;

  for (let peer of state.peers) {
    try {
      const response = await sendVoteRequest(peer, state.term, state.id);
      const data = await response.json();
      if (data.voteGranted) votes++;
      if (votes >= state.peers.length / 2) {
        becomeLeader();
        break;
      }
    } catch (error) {
      console.error(`Failed to get vote from ${peer}`);
    }
  }
}

async function sendVoteRequest(
  peer: string,
  term: number,
  candidateId: string
) {
  return fetch(`${peer}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ term, candidateId }),
  });
}

async function becomeLeader() {
  console.log(`Node ${state.id} became the leader.`);
  state.isLeader = true;
  state.leaderId = state.id ?? null;
  try {
    await fetch(process.env.BALANCER_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: state.id }),
    });
  } catch (error: any) {
    console.error("Error sending heartbeat:", error.message);
  }
}

export default startElection;
