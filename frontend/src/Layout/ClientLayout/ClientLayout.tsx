import React, { createContext, useContext, useState, ReactNode } from "react";
import PropTypes from "prop-types";
import SideBar from "../../Components/SideBar";
import GlobalMusicPlayer from "../../Components/GlobalMusicPlayer";
import LoadingCircle from "../../Components/UtilComponents/LoadingCircle";
import axios from "axios";
// Define the shape of the song data context
type SongDataContextType = {
  selectedSong: SongData | null;
  setSelectedSong: (song: SongData | null) => void;
  loadingNewSong: boolean;
  setLoadingNewSong: (loading: boolean) => void;
  autoRecommend?: boolean;
  setAutoRecommend?: (autoRecommend: boolean) => void;
};

// Create a context with an empty default value
const SongDataContext = createContext<SongDataContextType | undefined>(
  undefined
);

// Create a custom hook to use the SongDataContext
const useSongData = () => {
  const context = useContext(SongDataContext);
  if (context === undefined) {
    throw new Error("useSongData must be used within a SongDataProvider");
  }
  return context;
};

function ClientLayout({ children }: { children: ReactNode }) {
  const [selectedSong, setSelectedSong] = useState<SongData | null>(null);
  const [loadingNewSong, setLoadingNewSong] = useState(false);
  const [autoRecommend, setAutoRecommend] = useState<boolean>(false);
  const onSongFinished = async (id: number) => {
    if (!id) return;
    setLoadingNewSong(true);
    console.log("Song Finished");
    console.log("Calling recommendation API for id: " + id);
    const res = await axios.get("http://localhost:4000/api/songs/recommend", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        song_id: id,
      },
    });
    setSelectedSong({ ...res.data, _id: res.data._id });
    setLoadingNewSong(false);
    console.log("Recommendation API response: ", res.data);
  };
  return (
    <SongDataContext.Provider
      value={{
        selectedSong,
        setSelectedSong,
        loadingNewSong,
        setLoadingNewSong,
        autoRecommend,
        setAutoRecommend,
      }}
    >
      <div className="flex flex-col h-screen">
        <div className="flex flex-grow">
          <div className="w-1/5">
            <SideBar />
          </div>
          <div className="flex-grow w-4/5">
            <div>{children}</div>
            <div
              className="mx-2 ml-4 bg-zinc-800"
              style={{ borderRadius: "10px" }}
            >
              {loadingNewSong ? (
                <div className="py-1">
                  <LoadingCircle color="white" size={70} />
                </div>
              ) : (
                <GlobalMusicPlayer
                  selectedSong={selectedSong}
                  onSongEnd={() => {
                    //If onSongEnd is not set, do nothing
                    if (autoRecommend) onSongFinished(selectedSong?._id || 0);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </SongDataContext.Provider>
  );
}

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ClientLayout, useSongData };
