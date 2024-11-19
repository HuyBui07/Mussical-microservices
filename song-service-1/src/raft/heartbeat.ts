import { state } from "./state";
import { Heartbeat } from "./types";
import { serviceURLs } from "./constants";

export function startHeartbeatProcess() {
  setInterval(() => {
    if (state.isLeader) {
      sendHeartbeats();
    }
  }, 5000); // Send heartbeats every 5 seconds
}

async function sendHeartbeats() {
  for (const peer of state.peers) {
    const peerUrl = serviceURLs[peer];  
    try {
      await fetch(`${peerUrl}/raft/heartbeat_from_leader`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leaderId: state.id, term: state.term } as Heartbeat),
      });
    } catch (error: any) {
      console.error(`Failed to send heartbeat to ${peer}:`, error);
    }
  }
}