import { Response } from "express";
import { AuthRequest } from "../middlewares/requireAuth";

import Album from "../models/albumModel";

const getAllAlbums = async (req: AuthRequest, res: Response): Promise<void> => {
  const title = req.query.title as string;

  try {
    const albums = await Album.find({
      title: { $regex: new RegExp(title), $options: "i" },
    });
    res.status(200).json(albums);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const createAlbum = async (req: AuthRequest, res: Response): Promise<void> => {
  const { albumTitle, albumPoster } = req.body;

  try {
    const album = new Album({ albumTitle, albumPoster });
    await album.save();
    res.status(201).json(album);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const addSongToAlbum = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { album_id, song_ids } = req.body;

  try {
    const album = await Album.findById(album_id);
    if (!album) {
      throw new Error("Album not found");
    }

    for (const song_id of song_ids) {
      album.songs.push(song_id);
    }

    await album.save();
    res.status(200).json(album);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export { getAllAlbums, createAlbum, addSongToAlbum };
