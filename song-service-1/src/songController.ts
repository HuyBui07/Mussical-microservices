import { Request, Response } from "express";
import cloudinaryClient, { cloudinaryUploader } from "./cloudinary";

//model
import Song from "./models/songModel";
import HistoryRecord from "./models/historyRecord";
import { LogEntry } from "./models/logModel";

// middleware
import { PaginatedRequest } from "./middlewares/pagination";
import { AuthRequest } from "./middlewares/requireAuth";

// utils
import { forwardLogEntry } from "./utils";

// Raft State
import { state } from "./raft/state";

//create a new song
export const createSong = async (req: Request, res: Response) => {
  // if (
  //   !req.files ||
  //   !("posterFile" in req.files) ||
  //   !("sourceFile" in req.files)
  // ) {
  //   res.status(400).json({ message: "Missing required files" });
  //   return;
  // }

  // // Extract the files
  // const posterFile = (req.files as any).posterFile[0];
  // const sourceFile = (req.files as any).sourceFile[0];

  // try {
  //   // Upload files to Cloudinary
  //   const [posterResult, sourceResult] = await Promise.all([
  //     cloudinaryUploader(posterFile.buffer, "posters"),
  //     cloudinaryUploader(sourceFile.buffer, "songs"),
  //   ]);

  //   const posterUrl = posterResult.secure_url;
  //   const sourceUrl = sourceResult.secure_url;
  //   //Split with space for tags
  //   let { tags } = req.body;

  //   if (tags) {
  //     tags = tags.split(" ");
  //   }
  //   const newSong = new Song({
  //     title: req.body.title,
  //     artist: req.body.artist,
  //     poster: posterUrl,
  //     source: sourceUrl,
  //     tags: tags || [],
  //   });
  //   await newSong.save();
  //   res.status(201).json(newSong);
  // } catch (err: any) {
  //   console.log("Create song error", err);
  //   res.status(500).json({ message: err.message });
  // }

  try {
    state.latestLogIndex += 1;

    const logEntry = new LogEntry({
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
      status: "appended",
      index: state.latestLogIndex,
      term: state.term,
    });

    await logEntry.save();
    forwardLogEntry(logEntry);
    res.status(200).json({
      message: "Song creation request logged",
      logEntryId: logEntry._id,
    });
  } catch (error) {
    console.error("Error logging song creation request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get all songs for the main screen ()
export const getAllSongs = async (req: Request, res: Response) => {
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
//Get songs , based on creation date
export const getRecentSongs = async (req: Request, res: Response) => {
  const { page, limit } = (req as PaginatedRequest).pagination;
  try {
    // Retrieve songs sorted by createdAt in descending order
    const songs = await Song.find({})
      .sort({ dateCreated: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    // Count the total number of songs
    const totalCount = await Song.countDocuments({}).exec();

    // Assign current date to songs without a creation date
    songs.forEach((song) => {
      if (!song.dateCreated || song.dateCreated.toString() === "Invalid Date") {
        song.dateCreated = new Date();
      }
    });

    // Randomize the order of songs
    songs.sort(() => Math.random() - 0.5);

    // Set total count header and send the response
    res.setHeader("X-Total-Count", totalCount.toString());
    res.status(200).json(songs);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
//For you: get user most listened tags. Then get songs with those tags
// Put those songs on top, if not enough songs, fill in with other songs
//If no history available, return popular songs
export const getForYouSongs = async (req: AuthRequest, res: Response) => {
  const user_id = req.user_id;
  const { page, limit } = (req as PaginatedRequest).pagination;
  try {
    const userHistory = await HistoryRecord.find({ userId: user_id }).exec();
    if (userHistory.length === 0) {
      //No history available, return popular songs
      return getPopularSongs(req, res);
    }

    //Get user most listened tags
    const tagScore = new Map<string, number>();
    for (const record of userHistory) {
      const song = await Song.findById(record.songId);
      if (!song) continue;
      for (const tag of song.tags) {
        const currentScore = tagScore.get(tag) ?? 0;
        tagScore.set(tag, currentScore + 1);
      }
    }
    //Sort tags by score
    const sortedTags = Array.from(tagScore).sort((a, b) => b[1] - a[1]);
    //Get songs with those tags
    const totalCount = await Song.countDocuments({}).exec();
    let songs: any[] = [];
    for (const tag of sortedTags) {
      const tagSongs = await Song.find({ tags: tag[0] })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
      songs = songs.concat(tagSongs);
      if (songs.length >= limit) break;
    }
    //If not enough songs, fill in with other songs
    if (songs.length < limit) {
      const otherSongs = await Song.find({})
        .limit(limit - songs.length)
        .skip((page - 1) * limit)
        .exec();
      songs = songs.concat(otherSongs);
    }

    res.setHeader("X-Total-Count", totalCount.toString());
    res.status(200).json(songs);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

//popular songs: get top songs , using limit and and page
export const getPopularSongs = async (req: Request, res: Response) => {
  const { page, limit } = (req as PaginatedRequest).pagination;
  try {
    const songs = await Song.find({})
      .sort({ listenCount: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    const totalCount = await Song.countDocuments({}).exec();
    res.setHeader("X-Total-Count", totalCount.toString());
    res.status(200).json(songs);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

//get metadata from a song id
export const getMetadataFromSongId = async (req: Request, res: Response) => {
  const { song_id } = req.params;

  try {
    const song = await Song.findById(song_id);
    if (!song) {
      res.status(404).json({ message: "Song not found" });
      return;
    }

    res.status(200).json(song);
  } catch (err: any) {
    console.log("Get metadata error", err);
    res.status(500).json({ message: err.message });
  }
};

//increase listen count of a song and create a history record
export const increaseListenCount = async (req: AuthRequest, res: Response) => {
  const { song_id } = req.params;
  const defaultDelay = 10000; //10 seconds
  //get user id , then create history record
  const user_id = req.user_id;
  try {
    const song = await Song.findByIdAndUpdate(song_id, {
      $inc: { listenCount: 1 },
    }).exec();
    console.log("Song listen count increased: ", song);
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
export const deleteSong = async (req: Request, res: Response) => {
  const { song_id } = req.params;

  try {
    const song = await Song.findByIdAndDelete(song_id);
    if (!song) {
      res.status(404).json({ message: "Song not found" });
      return;
    }
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

    console.log("Tags: ", tags);
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

//Receive song id of a song user has just listened to
//Return 1 song id (not the current song id)
//Note : Must not return the current song id
//Process: Get first tag of the current song and artist
//Give score to each song based on the number of tags and artist match
//Increase score if the song has the same tag or artist
//Use user history
//With each song in history that has the same tag, increase the score. Increase 10X if the artist is the same (must be the same song)
//Return the song with the highest score
//General idea: Check for tags first. If artist has similar tags, increase score. If the artist is the same, increase score
//If the artist is the same, return the song
export const RecommendNextSong = async (req: AuthRequest, res: Response) => {
  const user_id = req.user_id;
  const { song_id } = req.query;
  console.log("Recommend next song for song id: ", song_id);

  //Value to adjust for influence of tags and artist
  const tagWeight = 2.5;
  const artistWeight = 1;

  const song = await Song.findById(song_id);
  console.log("Current song: ", song?._id);
  if (!song) {
    res.status(404).json({ message: "Song not found" });
    return;
  }

  try {
    const currentTags = song.tags;
    const currentArtist = song.artist;
    const history = await HistoryRecord.find({ userId: user_id }).exec();
    //Map song id to score
    const scoreMap = new Map<string, number>();
    for (const record of history) {
      if (record.songId.toString() === song_id) {
        continue; // Skip the current song in history
      }
      //If song doesn't exist, skip (might be deleted)
      if (!(await Song.findById(record.songId))) continue;

      const song = await Song.findById(record.songId);
      if (!song) continue;
      const tags = song.tags;
      const artist = song.artist;
      //Calculate score
      let score = 0;
      //Check tags
      for (const tag of tags) {
        if (currentTags.includes(tag)) {
          score += tagWeight;
        }
      }
      //Check artist
      if (currentArtist === artist) {
        score += artistWeight;
      }
      //Increase score if the song has the same tag or artist
      if (tags.includes(currentTags[0])) {
        score += tagWeight;
      }
      if (artist === currentArtist) {
        score += artistWeight;
      }
      //Add to score map
      const currentScore = scoreMap.get(record.songId) ?? 0;
      scoreMap.set(record.songId, currentScore + score);
    }
    //Sort by score
    const sortedScore = Array.from(scoreMap).sort((a, b) => b[1] - a[1]);
    console.log("Sorted score: ", sortedScore);
    //Return the song with the highest score
    const nextSongId = sortedScore[0][0];
    const songResult = await Song.findById(nextSongId);
    console.log("Recommended song: ", songResult);
    res.status(200).json(songResult);
  } catch (err: any) {
    console.log("Recommend next song error", err);
    res.status(500).json({ message: err.message });
  }
};
