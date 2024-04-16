/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
interface CreatePlaylistPopupProps {
  message: string;
  afterConfirm: (playlistName: string) => void;
  onCancel: () => void;
}

const CreatePlaylistPopup: React.FC<CreatePlaylistPopupProps> = ({
  message,
  afterConfirm,
  onCancel,
}) => {
  const [playlistName, setPlaylistName] = useState<string>("");
  const handleConfirm = () => {
    axios
      .post(
        "http://localhost:4000/api/playlists/create",
        {
          name: playlistName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        afterConfirm(playlistName);
      })
      .catch((err) => console.log("Error creating playlist: ", err));
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <p className="text-center text-black">{message}</p>
        <input
          type="text"
          className="border border-gray-400 rounded w-full p-2 mt-4 text-black"
          placeholder="Playlist name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />

        <div className="flex justify-center mt-4">
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistPopup;
