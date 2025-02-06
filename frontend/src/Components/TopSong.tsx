import React from "react";
import { SongStat } from "../Pages/Admin/Statistics"; // interface SongData {
//   _id: number;
//   title: string;
//   poster: string;
// }

interface SongProps {
  data: SongStat;
  rank: number;
}

const TopSong: React.FC<SongProps> = ({ data, rank }) => {
  return (
    <div className="ml-8 flex items-center mr-16">
      <p className="text-xl font-bold mr-4">{rank}</p>
      {/* Đặt margin-right cho phần rank */}
      <img
        src={data.song.poster}
        alt={data.song.title}
        className="h-48 w-48 object-cover"
      />
      <div>
        <p className="ml-4">{data.song.title}</p>
        <p className="ml-4">{data.count} listens</p>
      </div>
    </div>
  );
};

export default TopSong;
