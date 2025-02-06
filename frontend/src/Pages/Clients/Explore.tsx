import { useEffect, useState } from "react";

import Song from "../../Components/Song";
import AddToPlaylistPopup from "../../Components/UtilComponents/AddToPlaylistPopup";
import SearchBar from "../../Components/SearchBar";
import LoadingCircle from "../../Components/UtilComponents/LoadingCircle";
import { useSongData } from "../../Layout/ClientLayout/ClientLayout";
export default function Explore() {
  const [searchedSongs, setSearchedSongs] = useState<SongData[]>([]);

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentAddSong, setCurrentAddSong] = useState<SongData | null>(null);
  const { setAutoRecommend } = useSongData();

  // Loading circle state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAutoRecommend && setAutoRecommend(false);
  }, []);

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
        className="mt-2 mb-2 ml-4 bg-zinc-800 h-full "
        style={{ borderRadius: "10px" }}
      >
        <div className="flex mt-2">
          <SearchBar
            setSearchedSongs={setSearchedSongs}
            setLoadingState={setLoading}
          />
        </div>

        <div className="my-[14px] mx-3 bg-gray-600 h-[1px]" />

        <div className="h-[70vh]" style={{ overflow: "auto" }}>
          <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
            {loading ? (
              <LoadingCircle color="white" />
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {searchedSongs.map((song) => (
                  <Song
                    key={song._id}
                    data={song}
                    onClickAdd={() => handleAddToPlaylistPopup(song)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
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
