import { LogEntry } from './models/logModel'; // Import the LogEntry model

// Function to forward log entries to peer nodes
export const forwardLogEntry = async (logEntry: any) => {
  const peers = process.env.PEERS?.split(',') || [];

  const logEntryObject = logEntry.toObject();

  for (const peer of peers) {
    try {
      const response = await fetch(`http://${peer}/raft/appendEntries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logEntry: logEntryObject }),
      });

      if (!response.ok) {
        console.error(`Failed to forward log entry to ${peer}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error forwarding log entry to ${peer}:`, error);
    }
  }
};