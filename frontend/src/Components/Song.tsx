// Song component
import { useDispatch } from "react-redux";
import { setSelectedSong } from "../features/selectedSongSlice";

import { PlayCircleIcon } from "@heroicons/react/16/solid";
interface SongProps {
  data: SongData;
  //default true
  increaseListenCount?: boolean;
}
//Used in song discovery/ search results. Will automatically increase listen count every time a song is played
const Song: React.FC<SongProps> = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <a className="group">
      <div
        className="relative w-full overflow-hidden rounded-lg bg-gray-200"
        //Call api to increase listen count then onClick
        onClick={() => {
          console.log("Song clicked: ", data.title);
          const song: SongData = {
            _id: data._id,
            title: data.title,
            poster: data.poster,
            artist: data.artist,
            source: data.source,
            tags: data.tags,
          };
          dispatch(setSelectedSong(song));
        }}
      >
        <img
          src={data.poster}
          alt="none"
          className="h-48 w-full object-cover object-center group-hover:opacity-75"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <PlayCircleIcon className="w-16" />
        </div>
      </div>
      <h3 className="mt-4 text-md font-bold text-white">{data.title}</h3>
    </a>
  );
};

export default Song;
