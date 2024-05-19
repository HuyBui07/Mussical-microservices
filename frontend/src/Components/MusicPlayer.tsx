// MusicPlayer component
import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface MusicPlayerProps {
  selectedSong: SongData | null;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ selectedSong }) => {
  return (
    <div className="m-2 bg-zinc-800" style={{ borderRadius: "10px" }}>
      <div className="h-full w-full">
        <div className="flex flex-row bg-transparent border-transparent border-b rounded-t-xl space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-12">
          <div className="ml-2 flex items-center space-x-4 ">
            <img
              src={selectedSong ? selectedSong.poster : ""}
              alt=""
              width={88}
              height={88}
              className="flex-none rounded-lg bg-slate-100"
              loading="lazy"
              hidden={!selectedSong}
            />
            <div className="min-w-0 flex-auto space-y-1 font-semibold" hidden={!selectedSong}>
              <p className="text-cyan-500 dark:text-cyan-400 text-sm leading-6">
                <abbr title="Track">Track:</abbr> 05
              </p>
              <h2 className="text-slate-500 dark:text-slate-400 text-sm leading-6 truncate">
                {selectedSong
                  ? selectedSong.title
                  : "Music: New Album The Lorem"}
              </h2>
              <p className="text-slate-900 dark:text-slate-50 text-lg">
                {selectedSong ? selectedSong.artist : "Spotisimo"}
              </p>
            </div>
          </div>

          <div className="flex flex-row w-full h-full justify-center items-center">
            <AudioPlayer
              src={selectedSong ? selectedSong.source : ""}
              className="mt-[-10px] bg-transparent"
              customVolumeControls={[]}
              style={selectedSong ? { width: "100%" } : { opacity: 0.1}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
