import mongoose from "mongoose";
import { LogEntry } from "./models/logModel"; // Import the LogEntry model

// Function to process a log entry
const processLogEntry = async (logEntry: any) => {
    console.log("Processing log entry:", logEntry);
    // Add your processing logic here
  };
  

// Function to start the change stream
export const startLogProcessor = () => {
  const changeStream = LogEntry.watch();

  changeStream.on("change", async (change) => {
    if (
      change.operationType === "update" &&
      change.updateDescription.updatedFields.status === "committed"
    ) {
      const logEntry = await LogEntry.findById(change.documentKey._id);
      if (logEntry) {
        await processLogEntry(logEntry);
      }
    }
  });

  console.log("Log processor started");
};

