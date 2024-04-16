import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

interface SongItemProps {
  songId: number;
  onClick: (song: SongData) => void;
  playListId: string;
}
//Used in Playlist tab to display songs from a playlist
const SongItem: React.FC<SongItemProps> = ({ songId, onClick, playListId }) => {
  const [song, setSong] = useState<SongData>({
    _id: 0,
    title: "",
    artist: "",
    poster: "",
    source: "",
  });

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
      setLength(`${minutes}:${seconds}`);
    });
  }, []);
  return (
    <>
      {song._id !== 0 ? (
        <div
          className="flex flex-row justify-between items-center song-item hover:bg-gray-700 cursor-pointer p-2 rounded-lg my-2 bg-gray-800"
          onClick={() => onClick(song)}
        >
          <div className="flex flex-row items-center space-x-4">
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
      ) : (
        <> </>
      )}
    </>
  );
};

export default SongItem;
