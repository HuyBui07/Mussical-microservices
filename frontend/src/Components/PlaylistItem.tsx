// PlaylistItem.tsx
import React, { useState } from "react";
import RemoveButton from "./UtilComponents/RemoveButton";
import ConfirmPopup from "./UtilComponents/ConfirmPopup";
import axios from "axios";
interface PlaylistItemProps {
  playlist: PlaylistData;
  onSelect: (playlist: PlaylistData) => void;
  onRemove: () => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  playlist,
  onSelect,
  onRemove,
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const handleRemoveClick = () => {
    setShowPopup(true);
  };
  const handleRemoveCancel = () => {
    setShowPopup(false);
  };
  const handleRemoveConfirm = () => {
    setShowPopup(false);
    removePlaylist(playlist._id);
  };
  const removePlaylist = (playlistId: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .delete(`http://localhost:4000/api/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => onRemove())
        .catch((err) => console.log("Error deleting playlist: ", err));
    }
  };
  return (
    <>
      <div
        className="flex flex-row justify-between items-center cursor-pointer bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
        style={{ padding: "0.62em 1em" }}
      >
        <div
          className="text-white text-lg font-bold"
          onClick={() => onSelect(playlist)}
        >
          {playlist.name}
        </div>
        <div
          className="text-white text-sm ml-4"
          onClick={() => onSelect(playlist)}
        >
          {playlist.songs.length} songs
        </div>
        <RemoveButton onClick={handleRemoveClick} />
      </div>
      {showPopup && (
        <ConfirmPopup
          message="Are you sure you want to remove this song from the playlist?"
          onConfirm={handleRemoveConfirm}
          onCancel={handleRemoveCancel}
        />
      )}
    </>
  );
};

export default PlaylistItem;
