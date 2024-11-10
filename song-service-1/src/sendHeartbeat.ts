import { state } from "./raft/state";

const sendHeartbeat = async () => {
  try {
    const response = await fetch(process.env.MONITOR_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: process.env.SERVICE_ID, isLeader: state.isLeader }),
    });
    if (response.ok) {
      console.info("Heartbeat sent");
    } else {
      console.error("Failed to send heartbeat:", response.statusText);
    }
  } catch (error: any) {
    console.error("Error sending heartbeat:", error.message);
  }
};

export default sendHeartbeat;
