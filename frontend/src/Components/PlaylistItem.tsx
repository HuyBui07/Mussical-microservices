// PlaylistItem.tsx
import React from "react";

interface PlaylistItemProps {
  playlist: PlaylistData;
  onSelect: (playlist: PlaylistData) => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist, onSelect }) => {
  return (
    <div
      className="flex flex-row justify-between items-center cursor-pointer bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
      style={{ padding: "0.62em 1em" }}
      onClick={() => onSelect(playlist)}
    >
      <div className="text-white text-lg font-bold">{playlist.name}</div>
      <div className="text-white text-sm ml-4">
        {playlist.songs.length} songs
      </div>
      <div>&rarr;</div>
    </div>
  );
};

export default PlaylistItem;
