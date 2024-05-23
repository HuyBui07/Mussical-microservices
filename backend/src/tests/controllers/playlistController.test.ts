import { Response } from "express";
import {
  createPlaylist,
  addSongToPlaylist,
  getAllPlaylists,
  removeSongFromPlaylist,
  removePlaylist,
} from "../../controllers/playlistController";
import Playlist from "../../models/playlistModel";

jest.mock("../../models/playlistModel");

describe("Playlist Controller Tests", () => {
  let mockRequest: any;
  let mockResponse: Response;

  beforeEach(() => {
    // Initialize mock request and response objects
    mockRequest = {
      body: {},
      params: {},
      user: { _id: "user_id" },
    };
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPlaylist", () => {
    it("should create a new playlist", async () => {
      const playlistData = {
        name: "Test Playlist",
        user_id: "user_id",
        songs: [],
      };
      Playlist.create = jest.fn().mockResolvedValue(playlistData);

      await createPlaylist(mockRequest, mockResponse);

      expect(Playlist.create).toHaveBeenCalledWith({
        name: mockRequest.body.name,
        user_id: mockRequest.user._id,
        songs: [],
      });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(playlistData);
    });

    it("should handle errors during playlist creation", async () => {
      const errorMessage = "Error creating playlist";
      Playlist.create = jest.fn().mockRejectedValue(new Error(errorMessage));

      await createPlaylist(mockRequest, mockResponse);

      expect(Playlist.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("removePlaylist", () => {
    it("should remove a playlist", async () => {
      const playlist_id = "playlist_id";
      mockRequest.params.playlist_id = playlist_id;

      await removePlaylist(mockRequest, mockResponse);

      expect(Playlist.findByIdAndDelete).toHaveBeenCalledWith(playlist_id);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Playlist deleted",
      });
    });

    it("should handle errors during playlist deletion", async () => {
      const errorMessage = "Error deleting playlist";
      Playlist.findByIdAndDelete = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await removePlaylist(mockRequest, mockResponse);

      expect(Playlist.findByIdAndDelete).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("removeSongFromPlaylist", () => {
    it("should remove a song from a playlist", async () => {
      const playlist_id = "playlist_id";
      const song_id = "song_id";
      mockRequest.params.playlist_id = playlist_id;
      mockRequest.body.song_id = song_id;

      const updatedPlaylist = {
        name: "Test Playlist",
        user_id: "user_id",
        songs: [],
      };
      Playlist.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedPlaylist);

      await removeSongFromPlaylist(mockRequest, mockResponse);

      expect(Playlist.findByIdAndUpdate).toHaveBeenCalledWith(
        playlist_id,
        { $pull: { songs: song_id } },
        { new: true }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedPlaylist);
    });

    it("should handle errors during song removal", async () => {
      const errorMessage = "Error removing song from playlist";
      Playlist.findByIdAndUpdate = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await removeSongFromPlaylist(mockRequest, mockResponse);

      expect(Playlist.findByIdAndUpdate).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("addSongToPlaylist", () => {
    it("should add a song to a playlist", async () => {
      const playlist_id = "playlist_id";
      const song_id = "song_id";
      mockRequest.params.playlist_id = playlist_id;
      mockRequest.body.song_id = song_id;

      const updatedPlaylist = {
        name: "Test Playlist",
        user_id: "user_id",
        songs: [song_id],
      };
      Playlist.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedPlaylist);

      await addSongToPlaylist(mockRequest, mockResponse);

      expect(Playlist.findByIdAndUpdate).toHaveBeenCalledWith(
        playlist_id,
        { $addToSet: { songs: song_id } },
        { new: true }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedPlaylist);
    });

    it("should handle errors during song addition", async () => {
      const errorMessage = "Error adding song to playlist";
      Playlist.findByIdAndUpdate = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await addSongToPlaylist(mockRequest, mockResponse);

      expect(Playlist.findByIdAndUpdate).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("getAllPlaylists", () => {
    it("should get all playlists", async () => {
      const playlists = [
        {
          name: "Test Playlist 1",
          user_id: "user_id",
          songs: [],
        },
        {
          name: "Test Playlist 2",
          user_id: "user_id",
          songs: [],
        },
      ];
      Playlist.find = jest.fn().mockResolvedValue(playlists);

      await getAllPlaylists(mockRequest, mockResponse);

      expect(Playlist.find).toHaveBeenCalledWith({
        user_id: mockRequest.user._id,
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(playlists);
    });

    it("should handle errors during playlist retrieval", async () => {
      const errorMessage = "Error getting playlists";
      Playlist.find = jest.fn().mockRejectedValue(new Error(errorMessage));

      await getAllPlaylists(mockRequest, mockResponse);

      expect(Playlist.find).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
