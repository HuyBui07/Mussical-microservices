import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import SideBar from "../../Components/SideBar";
import GlobalMusicPlayer from "../../Components/GlobalMusicPlayer";

import { useSelector } from "react-redux";
// Define the shape of the song data context

function ClientLayout({ children }: { children: ReactNode }) {
  const selectedSong = useSelector(
    (state: any) => state.selectedSong
  ) as SongData | null;

  useEffect(() => {
    if (selectedSong) {
      console.log("Selected song updated:", selectedSong);
    }
  }, [selectedSong]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div className="w-1/5">
          <SideBar />
        </div>
        <div className="flex flex-col w-4/5 px-2">
          <div className="h-full">
            {children}
          </div>
          {selectedSong && (
            <div
              className="mt-2  bg-zinc-800 border-black"
              style={{ borderRadius: "10px" }}
            >
              <GlobalMusicPlayer
                selectedSong={selectedSong}
                onSongEnd={() => {
                  // If onSongEnd is not set, do nothing
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
