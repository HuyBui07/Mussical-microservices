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

export { getAllAlbums };
