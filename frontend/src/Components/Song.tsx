// Song component

import { PlayCircleIcon } from "@heroicons/react/16/solid";
import AddButton from "./UtilComponents/AddButton";
import { useSongData } from "../Layout/ClientLayout/ClientLayout";
interface SongProps {
  data: SongData;
  onClick?: () => void;
  onClickAdd: () => void;
  //default true
  increaseListenCount?: boolean;
}
//Used in song discovery/ search results. Will automatically increase listen count every time a song is played
const Song: React.FC<SongProps> = ({ data, onClick, onClickAdd }) => {
  const { setSelectedSong } = useSongData();

  return (
    <a className="group relative">
      <div className="absolute top-1 right-1 z-10">
        <AddButton onClick={onClickAdd} />
      </div>
      <div
        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
        //Call api to increase listen count then onClick
        onClick={async () => {
          const repsonse = await fetch(
            `http://localhost:4000/api/songs/${data._id}/play`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (repsonse.ok) {
            console.log("Successfully increased listen count");
          } else {
            console.error("Failed to increase listen count");
          }
          if (onClick) {
            onClick();
          }
          setSelectedSong(data);
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
      <h3 className="mt-4 ml-12 text-md text-white">{data.title}</h3>
    </a>
  );
};

export default Song;
