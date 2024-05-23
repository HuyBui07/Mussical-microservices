import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import Song from "../../models/songModel";
import { createSong, getAllSongs } from "../../controllers/songController";
import { getMetadataFromSongId } from "../../controllers/songController";
import { getTags } from "../../controllers/songController";
import { deleteSong } from "../../controllers/songController";
import { mock } from "jest-mock-extended";
import { PaginatedRequest } from "../../middlewares/pagination";
import { getRecentSongs } from "../../controllers/songController";
import { getPopularSongs } from "../../controllers/songController";
import { AuthRequest } from "../../middlewares/requireAuth";
import { getThisMonthStats } from "../../controllers/songController";
import multer = require("multer");
jest.mock("../../models/songModel");

jest.mock("cloudinary", () => {
  const cloudinaryClient = {
    v2: {
      config: jest.fn(),
      uploader: {
        upload_stream: jest.fn((options, callback) => {
          const stream = new (require("stream").PassThrough)();
          stream.end = jest.fn(() => {
            callback(null, { secure_url: "mocked_url" });
          });
          return stream;
        }),
      },
    },
  };
  return cloudinaryClient;
});

jest.mock("../../cloudinary");

const mockPaginatedRequest = mock<PaginatedRequest>();
const mockAuthRequest = mock<AuthRequest>();
const mockResponse = mock<Response>();
const mockSong = Song as jest.Mocked<typeof Song>;
const mockRequest = mock<Request>();

describe("getAllSongs", () => {
  beforeEach(() => {
    mockPaginatedRequest.query = {};
    mockPaginatedRequest.pagination = { limit: 4, page: 1 };

    mockResponse.status.mockReturnThis();
    mockResponse.setHeader.mockReturnThis();
  });

  it("should return a list of songs with the correct headers", async () => {
    const songs = [{ title: "Song 1" }, { title: "Song 2" }];
    const totalCount = 2;

    mockSong.find.mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(songs),
    } as any);

    mockSong.countDocuments.mockReturnValue({
      exec: jest.fn().mockResolvedValue(totalCount),
    } as any);

    await getAllSongs(mockPaginatedRequest, mockResponse);

    expect(mockResponse.setHeader).toHaveBeenCalledWith(
      "X-Total-Count",
      totalCount.toString()
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(songs);
  });

  it("should handle errors", async () => {
    const errorMessage = "Something went wrong";

    mockSong.find.mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      exec: jest.fn().mockRejectedValue(new Error(errorMessage)),
    } as any);

    await getAllSongs(mockPaginatedRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

// Get recent song
describe("getRecentSongs", () => {
  beforeEach(() => {
    mockResponse.status.mockReturnThis();
  });

  it("should return a list of songs", async () => {
    const songs = [{ title: "Song 1" }, { title: "Song 2" }];

    mockSong.find.mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(songs),
    } as any);

    await getRecentSongs(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(songs);
  });

  it("should handle errors", async () => {
    const errorMessage = "Something went wrong";

    mockSong.find.mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockRejectedValue(new Error(errorMessage)),
    } as any);

    await getRecentSongs(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
// get popular songs
describe("getPopularSongs", () => {
  beforeEach(() => {
    mockResponse.status.mockReturnThis();
  });

  it("should return a list of songs", async () => {
    const songs = [{ title: "Song 1" }, { title: "Song 2" }];

    mockSong.find.mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(songs),
    } as any);

    await getPopularSongs(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(songs);
  });

  it("should handle errors", async () => {
    const errorMessage = "Something went wrong";

    mockSong.find.mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockRejectedValue(new Error(errorMessage)),
    } as any);

    await getPopularSongs(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

//get meta data
describe("getMetadataFromSongId", () => {
  beforeEach(() => {
    mockResponse.status.mockReturnThis();
  });

  it("should return metadata for a valid song ID", async () => {
    const songId = "valid_song_id";
    const song = { _id: songId, title: "Song 1", listenCount: 0 };

    mockRequest.params = { song_id: songId };
    mockSong.findById.mockResolvedValue(song);

    await getMetadataFromSongId(mockRequest, mockResponse);

    expect(mockSong.findById).toHaveBeenCalledWith(songId);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(song);
  });

  it("should handle when song is not found", async () => {
    const songId = "nonexistent_song_id";

    mockRequest.params = { song_id: songId };
    mockSong.findById.mockResolvedValue(null);

    await getMetadataFromSongId(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Song not found",
    });
  });

  it("should handle errors", async () => {
    const songId = "valid_song_id";
    const errorMessage = "Something went wrong";

    mockRequest.params = { song_id: songId };
    mockSong.findById.mockRejectedValue(new Error(errorMessage));

    await getMetadataFromSongId(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
//get tags
describe("getTags", () => {
  beforeEach(() => {
    mockResponse.status.mockReturnThis();
  });

  it("should return a list of tags with their counts", async () => {
    const tags = [
      { _id: "tag1", count: 2 },
      { _id: "tag2", count: 1 },
    ];

    mockSong.aggregate.mockResolvedValue(tags);

    await getTags(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(tags);
  });

  it("should handle errors", async () => {
    const errorMessage = "Something went wrong";

    mockSong.aggregate.mockRejectedValue(new Error(errorMessage));

    await getTags(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

//find song, using explore with query title
describe("findSong", () => {
  beforeEach(() => {
    mockResponse.status.mockReturnThis();
  });

  it("should return a list of songs", async () => {
    const songs = [{ title: "Song 1" }, { title: "Song 2" }];

    mockSong.find.mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(songs),
    } as any);

    await getRecentSongs(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(songs);
  });

  it("should handle errors", async () => {
    const errorMessage = "Something went wrong";

    mockSong.find.mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockRejectedValue(new Error(errorMessage)),
    } as any);

    await getRecentSongs(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

//delete song
describe("deleteSong", () => {
  let tempId: string;
  const artist = "artist";
  const title = "title";
  const source = "source";
  const poster = "poster";
  beforeEach(async () => {
    mockResponse.status.mockReturnThis();
    mockResponse.json.mockReturnThis();
    const song = new Song({ artist, title, source, poster });
    await song.save();

    tempId = song._id;
  });

  it("should delete a song", async () => {
    const songId = tempId;

    mockRequest.params = { song_id: songId };
    mockSong.findByIdAndDelete.mockResolvedValue({ _id: songId });

    await deleteSong(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it("should handle when song is not found", async () => {
    const songId = "nonexistent_song_id";

    mockRequest.params = { song_id: songId };
    mockSong.findByIdAndDelete.mockResolvedValue(null);

    await deleteSong(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
  });

  it("should handle errors", async () => {
    const songId = "valid_song_id";
    const errorMessage = "Something went wrong";

    mockRequest.params = { song_id: songId };
    mockSong.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

    await deleteSong(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
