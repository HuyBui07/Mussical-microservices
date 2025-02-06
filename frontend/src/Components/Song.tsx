// Song component
import { PlayCircleIcon } from "@heroicons/react/16/solid";
interface SongProps {
  data: SongData;
  //default true
  increaseListenCount?: boolean;
}
//Used in song discovery/ search results. Will automatically increase listen count every time a song is played
const Song: React.FC<SongProps> = ({ data }) => {
  return (
    <a className="group relative">
      <div
        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
        //Call api to increase listen count then onClick
        onClick={async () => {
          
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
