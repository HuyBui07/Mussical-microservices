// Home component
import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import Song from "../Components/Song";
import MusicPlayer from "../Components/MusicPlayer";
import axios from "axios";

interface SongData {
  id: number;
  title: string;
  poster: string;
  artist: string;
  source: string;
}

export default function Home() {
  const [songs, setSongs] = useState<SongData[]>([]);
  const [selectedSong, setSelectedSong] = useState<SongData | null>(null);

  useEffect(() => {
    axios
      .get<SongData[]>("http://localhost:4000/api/songs/all")
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSongClick = (song: SongData) => {
    setSelectedSong(song);
  };

  return (
    <>
      <div
        className="m-2 ml-4 bg-zinc-800 h-[80%] "
        style={{ borderRadius: "10px" }}
      >
        <NavBar />
        <div className="my-[14px] mx-3 bg-gray-600 h-[1px]" />
        <div style={{ overflow: "auto", maxHeight: "500px" }}>
          <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
            <div className="flex flex-row justify-between">
              <h2 className="text-md text-white my-4">Recent Songs</h2>
              <div className="flex flex-row">
                <ChevronLeftIcon className="w-6" />
                <ChevronRightIcon className="w-6" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {songs.map((song) => (
                <Song
                  key={song.id}
                  data={song}
                  onClick={() => handleSongClick(song)}
                />
              ))}
            </div>
          </div>
          <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
            <div className="flex flex-row justify-between">
              <h2 className="text-md text-white my-4">Top Picks For You</h2>
              <div className="flex flex-row">
                <ChevronLeftIcon className="w-6" />
                <ChevronRightIcon className="w-6" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {songs.map((song) => (
                <Song
                  key={song.id}
                  data={song}
                  onClick={() => handleSongClick(song)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-2  ml-4 bg-zinc-800" style={{ borderRadius: "10px" }}>
        <MusicPlayer selectedSong={selectedSong} />
      </div>
    </>
  );
}
