/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
interface AddToPlaylistPopupProps {
  message: string;
  songId: number | undefined;
  afterConfirm: (playlistName: PlaylistData) => void;
  onCancel: () => void;
}

const AddToPlaylistPopup = ({
  songId,
  message,
  afterConfirm,
  onCancel,
}: AddToPlaylistPopupProps) => {
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/playlists/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setPlaylists(res.data))
      .catch((err) => console.log("Error fetching playlist: ", err));
    console.log("playlists", playlists);
  }, []);

  const handleAddToPlaylist = (playlist: PlaylistData) => {
    axios
      .post(
        `http://localhost:4000/api/playlists/add/${playlist._id}`,
        {
          song_id: songId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        afterConfirm(playlist);
      })
      .catch((err) => console.log("Error adding song to playlist: ", err));
    console.log("playlist", playlist);
  };

  return (
    <>
      {songId && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white p-4 rounded-lg z-50">
            <p className="text-center text-black font-semibold">{message}</p>
            <div className="flex flex-col">
              {playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  className="p-2 my-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 text-black font-mono"
                  onClick={() => handleAddToPlaylist(playlist)}
                >
                  {playlist.name}
                </div>
              ))}
            </div>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded mt-4 hover:bg-red-600"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToPlaylistPopup;
