import Song from "../models/songModel";
import cloudinaryClient from "../cloudinary";

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
      // Delete song's assets
      const posterUrl = body?.poster;
      const sourceUrl = body?.source;
      if (posterUrl && sourceUrl) {
        const publicIdPoster = posterUrl.split("/").pop()?.split(".")[0];
        const publicIdSource = sourceUrl.split("/").pop()?.split(".")[0];
        if (publicIdPoster && publicIdSource) {
          await Promise.all([
            cloudinaryClient.uploader.destroy(publicIdPoster),
            cloudinaryClient.uploader.destroy(publicIdSource),
          ]);
          console.log("Deleted poster and source from cloudinary");
        }
      }
      
      // Delete the song
      await Song.findOneAndDelete({ title: body.title });
    }

    console.log(`Processed log entry with ID: ${logEntry._id}`);
  } catch (error) {
    console.error("Error processing log entry:", error);
  }
};
