import { state } from "./state";
import { Heartbeat } from "./types";
import { serviceURLs } from "./constants";

export function startHeartbeatProcess() {
  setInterval(() => {
    if (state.isLeader) {
      sendHeartbeats();
    }
  }, 5000);
}

async function sendHeartbeats() {
  for (const peer of state.peers) {
    const peerUrl = serviceURLs[peer];
    await sendHeartbeatWithRetry(peerUrl, 3);
  }
}

async function sendHeartbeatWithRetry(peerUrl: string, retries: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    await fetch(`${peerUrl}/raft/heartbeat_from_leader`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leaderId: state.id,
        term: state.term,
      } as Heartbeat),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (retries > 0) {
      console.warn(
        `Retrying heartbeat to ${peerUrl}. Retries left: ${retries - 1}`
      );
      await sendHeartbeatWithRetry(peerUrl, retries - 1);
    } else {
      console.error(
        `Failed to send heartbeat to ${peerUrl} after multiple attempts:`,
        error
      );
    }
  }
}
