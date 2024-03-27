import { google } from "googleapis";
import fs from "fs";
import { Request, Response } from "express";

//model
import Song from "../models/songModel";

// const propSong: Song = {
//   id: 1,
//   title: "Under The Sun",
//   artist: "Keys of Moon",
//   file_id: "1wGFmr8t0aPnbUD_EJw1O3DrLLo9RmtP9",
// };

//get all songs for the main screen ()
const getAllSongs = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

//get metadata from a song id
const getMetadataFromSongId = async (req: Request, res: Response) => {
  const { song_id } = req.params;

  try {
    const song = await Song.findById(song_id);
    res.status(200).json(song);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

//get the song file from Drive
const getSongFile = async (req: any, res: any) => {
  const fileId = req.params.file_id;
  // Load client secrets from a local file.
  fs.readFile("./apikeys.json", (err, content: any) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), (auth: any) => {
      const drive = google.drive({ version: "v3", auth });

      drive.files.get({ fileId: fileId }, (err: any, file: any) => {
        if (err) {
          console.log("The API returned an error: " + err);
          return;
        }

        res.setHeader("Content-Type", file.data.mimeType);
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + encodeURIComponent(file.data.name)
        );

        drive.files.get(
          { fileId: fileId, alt: "media" },
          { responseType: "stream" },
          (err: any, response: any) => {
            if (err) {
              console.log("The API returned an error: " + err);
              return;
            }

            response.data
              .on("end", () => {
                console.log("Done");
              })
              .on("error", (err: any) => {
                console.log("Error", err);
              })
              .pipe(res);
          }
        );
      });
    });
  });
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials: any, callback: any) {
  const { client_email, private_key } = credentials;
  const oAuth2Client = new google.auth.JWT(
    client_email,
    undefined, // Replace null with undefined
    private_key,
    ["https://www.googleapis.com/auth/drive"], // Scope for read-only access to Google Drive
    undefined
  );

  callback(oAuth2Client);
}

export { getAllSongs, getMetadataFromSongId, getSongFile };
