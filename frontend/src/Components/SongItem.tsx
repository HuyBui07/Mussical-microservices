/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ConfirmPopup from "./UtilComponents/ConfirmPopup";
import RemoveButton from "./UtilComponents/RemoveButton";
interface SongItemProps {
  songId: number;
  onClick: (song: SongData) => void;
  playListId: string;
  onRemove: () => void;
}
// Used in Playlist tab to display songs from a playlist
const SongItem: React.FC<SongItemProps> = ({
  songId,
  onClick,
  playListId,
  onRemove,
}) => {
  const [song, setSong] = useState<SongData>({
    _id: 0,
    title: "",
    artist: "",
    poster: "",
    source: "",
  });
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [length, setLength] = useState<string>("");
  useEffect(() => {
    console.log("Playlist ID: ", playListId);
    // Fetch song data
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get<SongData>(`http://localhost:4000/api/songs/${songId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setSong(res.data))
        .catch((err) => console.log("Error fetching song: ", err));
    }
    const audio = new Audio(song.source);
    audio.addEventListener("loadedmetadata", () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration - minutes * 60);
      if (seconds < 10) {
        setLength(`${minutes}:0${seconds}`);
        return;
      }
      setLength(`${minutes}:${seconds}`);
    });
  }, []);
  const removeFromPlaylist = () => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post(
          `http://localhost:4000/api/playlists/remove/${playListId}`,
          {
            song_id: songId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log("Song removed from playlist: ", res.data);
          onRemove();
        })
        .catch((err) => {
          console.log("Error removing song from playlist: ", err);
        });
    }
  };
  const handleRemoveClick = () => {
    setShowPopup(true);
  };

  const handleConfirmRemove = () => {
    removeFromPlaylist();
    setShowPopup(false);
  };

  const handleCancelRemove = () => {
    setShowPopup(false);
  };
  return (
    <>
      {song._id !== 0 ? (
        <div className="flex flex-row justify-between items-center song-item hover:bg-gray-700 cursor-pointer p-2 rounded-lg my-2 bg-gray-800">
          <div
            className="flex flex-row items-center space-x-4 flex-grow justify-between mr-4"
            onClick={() => onClick(song)}
          >
            <div className="flex flex-row items-center">
              <img
                src={song.poster}
                alt="none"
                className="h-16 w-16 object-cover object-center rounded-lg"
              />
              <div className="flex flex-col ml-4">
                <div className="text-white font-bold">{song.title}</div>
                <div className="text-white text-sm">{song.artist}</div>
              </div>
            </div>
            <div className="text-white text-sm ml-4">{length}</div>
          </div>

          <RemoveButton onClick={handleRemoveClick} />
        </div>
      ) : null}

      {showPopup && (
        <ConfirmPopup
          message="Are you sure you want to remove this song from the playlist?"
          onConfirm={handleConfirmRemove}
          onCancel={handleCancelRemove}
        />
      )}
    </>
  );
};

export default SongItem;
