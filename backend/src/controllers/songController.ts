import { google } from "googleapis";
import fs from "fs";
import { Request, Response } from "express";
import cloudinaryClient, { cloudinaryUploader } from "../cloudinary";
//model
import Song from "../models/songModel";
import { PaginatedRequest } from "../middlewares/pagination";
import HistoryRecord from "../models/historyRecord";
import { AuthRequest } from "../middlewares/requireAuth";
import User from "../models/userModel";
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
    //Split with space for tags
    let { tags } = req.body;

    if (tags) {
      tags = tags.split(" ");
    }
    const newSong = new Song({
      title: req.body.title,
      artist: req.body.artist,
      poster: posterUrl,
      source: sourceUrl,
      tags: tags || [],
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
  const title = (req.query.title as string) || "";
  const { page, limit } = (req as PaginatedRequest).pagination;
  try {
    const songs = await Song.find({
      title: { $regex: title, $options: "i" },
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    //total count to attach to header
    const totalCount = await Song.countDocuments({
      title: { $regex: title, $options: "i" },
    }).exec();

    res.setHeader("X-Total-Count", totalCount.toString());
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

//increase listen count of a song and create a history record
const increaseListenCount = async (req: AuthRequest, res: Response) => {
  const { song_id } = req.params;
  const defaultDelay = 10000; //10 seconds
  //get user id , then create history record
  const user_id = req.user?._id;
  try {
    await Song.findByIdAndUpdate(song_id, { $inc: { listenCount: 1 } }).exec();

    const newRecord = new HistoryRecord({
      userId: user_id,
      songId: song_id,
      dateListened: new Date(),
    });
    await newRecord.save();
    console.log("History record created: ", newRecord);
    res.status(200).json({ message: "Listen count increased" });
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
        console.log("Deleted poster and source from cloudinary");
      }
    }
    console.log("Deleted song", song);
    res.status(200).json(song);
  } catch (err: any) {
    console.log("Delete song error", err);
    res.status(500).json({ message: err.message });
  }
};
//Return all tag by scanning Songs
export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await Song.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    res.status(200).json(tags);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSong = async (req: Request, res: Response) => {
  const { song_id } = req.params;
  //allowed update : title, artist, source, poster, tags (array of string, can be empty)
  //todo: currently if a song has multi tag and we update, it will replace all tags with new tags
  const { title, artist, source, poster } = req.body;
  const { tags } = req.body;

  try {
    const song = await Song.findByIdAndUpdate(
      song_id,
      { title, artist, source, poster, tags },
      { new: true }
    );
    res.status(200).json(song);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
//Return each week listening count total of the month using history record
//Return top 5 tags of the month using history record
//Return top 3 songs of this month using history record
export const getThisMonthStats = async (req: Request, res: Response) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const firstWeekStart = new Date(currentYear, currentMonth, 2);
  const nextMonthStart = new Date(currentYear, currentMonth + 1, 2);
  console.log("First week start: ", firstWeekStart);
  console.log("Next month start: ", nextMonthStart);
  console.log("Querying this month stats");

  try {
    const totalListenCount = await HistoryRecord.aggregate([
      {
        $match: {
          dateListened: {
            $gte: firstWeekStart,
            $lt: nextMonthStart,
          },
        },
      },
    ]);
    //Fill into 4 weeks (1-7, 8-14, 15-21, 22- end of month)
    const totalListenCountResult = Array(4).fill(0);
    totalListenCount.forEach((record) => {
      const dateListened = record.dateListened;
      const date = dateListened.getDate();
      if (date <= 7) {
        totalListenCountResult[0]++;
      } else if (date <= 14) {
        totalListenCountResult[1]++;
      } else if (date <= 21) {
        totalListenCountResult[2]++;
      } else {
        totalListenCountResult[3]++;
      }
    });
    //Return top 5 tags of the month and divide using percentage, then have one other field for the rest
    const topTags = await HistoryRecord.aggregate([
      {
        $match: {
          dateListened: {
            $gte: firstWeekStart,
            $lt: nextMonthStart,
          },
        },
      },
      {
        $lookup: {
          from: "songs",
          localField: "songId",
          foreignField: "_id",
          as: "song",
        },
      },
      {
        $unwind: "$song",
      },
      {
        $unwind: "$song.tags",
      },
      {
        $group: {
          _id: "$song.tags",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    //Modify to include other using percentage
    const totalTagCount = await HistoryRecord.countDocuments({
      dateListened: {
        $gte: firstWeekStart,
        $lt: nextMonthStart,
      },
    });

    const topTagsResult = topTags.map((tag) => ({
      tag: tag._id,
      percentage: (tag.count / totalTagCount) * 100,
    }));

    const otherPercentage =
      100 - topTagsResult.reduce((acc, tag) => acc + tag.percentage, 0);
    if (otherPercentage > 0)
      topTagsResult.push({ tag: "Other", percentage: otherPercentage });

    const topSongs = await HistoryRecord.aggregate([
      {
        $match: {
          dateListened: {
            $gte: firstWeekStart,
            $lt: nextMonthStart,
          },
        },
      },
      {
        $group: {
          _id: "$songId",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    const topSongsResult = await Promise.all(
      topSongs.map(async (song) => {
        const songInfo = await Song.findById(song._id);
        return {
          song: songInfo,
          count: song.count,
        };
      })
    );

    res.status(200).json({
      totalListenCount: totalListenCountResult,
      topTags: topTagsResult,
      topSongs: topSongsResult,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const injectionTest = async (req: Request, res: Response) => {
  // Set all song listen count to 0
  // For each song, find a random user, create a history record with date ranging from the beginning of the current month to now
  // Total 100 records
  const songs = await Song.find().exec();
  const users = await User.find().exec();
  const currentDate = new Date();

  // Set oneMonthAgo to the start of the current month
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    //Random hack because of timezone and some weird stuff
    2
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const timeRange = endOfMonth.getTime() - startOfMonth.getTime();

  // Clear history record
  await HistoryRecord.deleteMany({}).exec();
  console.log("Cleared history record");
  console.log("Start of month: ", startOfMonth);
  console.log("End of month: ", endOfMonth);
  console.log("Injection test started");

  for (let i = 0; i < 1000; i++) {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomDate = new Date(
      startOfMonth.getTime() + Math.random() * timeRange
    );
    const newRecord = new HistoryRecord({
      userId: randomUser._id,
      songId: randomSong._id,
      dateListened: randomDate,
    });
    await newRecord.save();
  }

  console.log("Injection test finished!");
  res.status(200).json({ message: "Injection test finished" });
};

export {
  getAllSongs,
  createSong,
  getMetadataFromSongId,
  deleteSong,
  increaseListenCount,
};
