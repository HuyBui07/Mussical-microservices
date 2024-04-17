import { useEffect, useState } from "react";
import MusicPlayer from "../Components/MusicPlayer";
import NavBar from "../Components/NavBar";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import Song from "../Components/Song";
import axios from "axios";
import AddToPlaylistPopup from "../Components/UtilComponents/AddToPlaylistPopup";

export default function Explore() {
  const [songs, setSongs] = useState<SongData[]>([]);
  const [selectedSong, setSelectedSong] = useState<SongData | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentAddSong, setCurrentAddSong] = useState<SongData | null>(null);

  useEffect(() => {
    axios
      .get<SongData[]>("http://localhost:4000/api/songs/all")
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSongClick = (song: SongData) => {
    setSelectedSong(song);
  };

  const handleAddToPlaylistPopup = (song: SongData) => {
    setCurrentAddSong(song);
    setShowPopup(true);
  };

  const handleCancelAddToPlaylist = () => {
    setCurrentAddSong(null);
    setShowPopup(false);
  };

  return (
    <>
      <div
        className="m-2 mb-8 ml-4 bg-zinc-800 h-[80%] "
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
                  key={song._id}
                  data={song}
                  onClick={() => handleSongClick(song)}
                  onClickAdd={() => handleAddToPlaylistPopup(song)}
                />
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
            <div className="flex flex-row justify-between">
              <h2 className="text-md text-white my-4">Recommended</h2>
              <div className="flex flex-row">
                <ChevronLeftIcon className="w-6" />
                <ChevronRightIcon className="w-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {songs.map((song) => (
                <Song
                  key={song._id}
                  data={song}
                  onClick={() => handleSongClick(song)}
                  onClickAdd={() => handleAddToPlaylistPopup(song)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="mx-2 mt-[-25px] ml-4 bg-zinc-800 h-[17%] "
        style={{ borderRadius: "10px" }}
      >
        <MusicPlayer selectedSong={selectedSong} />
      </div>

      {showPopup && (
        <AddToPlaylistPopup
          songId={currentAddSong?._id}
          message="Add to Playlist"
          afterConfirm={() => setShowPopup(false)}
          onCancel={handleCancelAddToPlaylist}
        />
      )}
    </>
  );
}
