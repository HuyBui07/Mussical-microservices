import Song from "../models/songModel";

export const processLogEntry = async (logEntry: any) => {
  try {
    const { method, body } = logEntry;

    if (method === "POST") {
      const newSong = new Song(body);
      await newSong.save();
      console.log(`Created new song with ID: ${newSong._id}`);
    } else if (method === "PUT") {
      // Update the song
    } else if (method === "DELETE") {
      // Delete the song
    }

    console.log(`Processed log entry with ID: ${logEntry._id}`);
  } catch (error) {
    console.error("Error processing log entry:", error);
  }
};
