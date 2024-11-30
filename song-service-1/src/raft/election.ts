import { state } from "./state";
import { serviceURLs } from "./constants";
import { startHeartbeatProcess } from "./heartbeat";

async function startElection() {
  const randomTimeout = 5000 + Math.floor(Math.random() * 5000);
  setTimeout(async () => {
    console.log(
      `Node ${state.id} starting election for term ${state.term + 1}`
    );

    state.term += 1;
    let votes = 0;
    if (state.votedFor) {
      console.log(`Already voted for ${state.votedFor}`);
      return;
    } else if (state.votedFor === state.id) {
      votes++;
    } else {
      state.votedFor = state.id;
      votes++;
    }

    for (let peer of state.peers) {
      const peerUrl = serviceURLs[peer];
      const peerTerm = state.term;
      const candidateId = state.id;
      try {
        const response = await fetch(`${peerUrl}/raft/vote`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ peerTerm, candidateId }),
        });
        const data = await response.json();
        if (data.voteGranted) votes++;
        if (votes > state.peers.length / 2) {
          becomeLeader();
          break;
        }
      } catch (error: any) {
        console.error(`Failed to get vote from ${peer}:`, error.message);
      }
    }
  }, randomTimeout);
}

async function becomeLeader() {
  console.log(`Node ${state.id} became the leader.`);
  state.isLeader = true;
  state.leaderId = state.id ?? null;

  // Start sending heartbeats
  startHeartbeatProcess();

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
