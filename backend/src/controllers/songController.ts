import { google } from "googleapis";
import fs from "fs";
import { Request, Response } from "express";
import cloudinaryClient, { cloudinaryUploader } from "../cloudinary";
//model
import Song from "../models/songModel";

//create a new song
const createSong = async (req: Request, res: Response) => {
  if (
    !req.files ||
    !("posterFile" in req.files) ||
    !("sourceFile" in req.files)
  ) {
    return res.status(400).json({ message: "Missing required files" });
  }

  // Extract the files
  const posterFile = (req.files as any).posterFile[0];
  const sourceFile = (req.files as any).sourceFile[0];

  try {
    // Upload files to Cloudinary
    const [posterResult, sourceResult] = await Promise.all([
      cloudinaryUploader(posterFile.buffer, "posters"),
      cloudinaryUploader(sourceFile.buffer, "songs"),
    ]);

    const posterUrl = posterResult.secure_url;
    const sourceUrl = sourceResult.secure_url;

    // Create a new song
    const newSong = new Song({
      title: req.body.title,
      artist: req.body.artist,
      poster: posterUrl,
      source: sourceUrl,
    });
    await newSong.save();
    return res.status(201).json(newSong);
  } catch (err: any) {
    console.log("Create song error", err);
    res.status(500).json({ message: err.message });
  }
};

//get all songs for the main screen ()
const getAllSongs = async (req: Request, res: Response) => {
  const title = req.query.title as string;

  try {
    const songs = await Song.find({
      title: { $regex: new RegExp(title), $options: "i" },
    });
    res.status(200).json(songs);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

//get metadata from a song id
const getMetadataFromSongId = async (req: Request, res: Response) => {
  const { song_id } = req.params;

  try {
    const song = await Song.findById(song_id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    //If found , increase song listen count
    await Song.findByIdAndUpdate(song_id, { $inc: { listenCount: 1 } }).exec();
    res.status(200).json(song);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

//delete a song
const deleteSong = async (req: Request, res: Response) => {
  const { song_id } = req.params;

  try {
    const song = await Song.findByIdAndDelete(song_id);
    //Call the cloudinary api to delete the poster and source
    const posterUrl = song?.poster;
    const sourceUrl = song?.source;
    if (posterUrl && sourceUrl) {
      const publicIdPoster = posterUrl.split("/").pop()?.split(".")[0];
      const publicIdSource = sourceUrl.split("/").pop()?.split(".")[0];
      if (publicIdPoster && publicIdSource) {
        await Promise.all([
          cloudinaryClient.uploader.destroy(publicIdPoster),
          cloudinaryClient.uploader.destroy(publicIdSource),
        ]);
      }
    }
    res.status(200).json(song);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllSongs, createSong, getMetadataFromSongId, deleteSong };
