import { google } from "googleapis";
import fs from "fs";
import { Request, Response } from "express";

//model
import Song from "../models/songModel";

//create a new song
const createSong = async (req: Request, res: Response) => {
  const { title, artist, source, poster } = req.body;

  try {
    const newSong = new Song({ title, artist, source, poster });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

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
    res.status(200).json(song);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllSongs, createSong, getMetadataFromSongId, deleteSong };
