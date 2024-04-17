// Song component

import { PlayCircleIcon } from "@heroicons/react/16/solid";
import AddButton from "./UtilComponents/AddButton";

interface SongProps {
  data: {
    _id: number;
    title: string;
    poster: string;
  };
  onClick: () => void;
  onClickAdd: () => void;
}
//Used in song discovery/ search results
const Song: React.FC<SongProps> = ({ data, onClick, onClickAdd }) => {
  return (
    <a className="group relative">
      <div className="absolute top-1 right-1 z-10">
        <AddButton onClick={onClickAdd} />
      </div>
      <div
        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
        onClick={onClick}
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
