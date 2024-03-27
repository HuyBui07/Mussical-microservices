import { Response } from "express";
import Playlist from "../models/playlistModel";
import { AuthRequest } from "../middlewares/requireAuth";

const createPlaylist = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { name } = req.body;
  const user_id  = req.user?._id;

  if (!user_id) {
    res.status(401).json({ message: "Unauthorized request" });
    return;
  }

  try {
    const newPlaylist = await Playlist.create({ name, user_id: user_id, songs: []});
    res.status(201).json(newPlaylist);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const addSongToPlaylist = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { playlist_id } = req.params;
  const { file_id } = req.body;

  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlist_id,
      { $addToSet: { songs: file_id } },
      { new: true }
    );

    res.status(200).json(updatedPlaylist);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

//get all playlists for the user
const getAllPlaylists = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const user_id = req.user?._id;

  if (!user_id) {
    res.status(401).json({ message: "Unauthorized request" });
    return;
  }

  try {
    const playlists = await Playlist.find({ user_id });
    res.status(200).json(playlists);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export { createPlaylist, addSongToPlaylist, getAllPlaylists };
