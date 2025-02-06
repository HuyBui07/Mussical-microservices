import React, { createContext, useContext, useState, ReactNode } from "react";
import PropTypes from "prop-types";
import SideBar from "../../Components/SideBar";
import GlobalMusicPlayer from "../../Components/GlobalMusicPlayer";
import LoadingCircle from "../../Components/UtilComponents/LoadingCircle";
import axios from "axios";
// Define the shape of the song data context

function ClientLayout({ children }: { children: ReactNode }) {
  const [selectedSong, setSelectedSong] = useState<SongData | null>(null);
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div className="w-1/5">
          <SideBar />
        </div>
        <div className="flex-grow w-4/5 px-2">
          <div className="h-full">{children}</div>
          {selectedSong && (
            <div
              className="mx-2 ml-4 bg-zinc-800"
              style={{ borderRadius: "10px" }}
            >
              <GlobalMusicPlayer
                selectedSong={selectedSong}
                onSongEnd={() => {
                  //If onSongEnd is not set, do nothing
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ClientLayout };
