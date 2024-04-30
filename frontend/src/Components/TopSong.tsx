import React from "react";

interface SongData {
  _id: number;
  title: string;
  poster: string;
}

interface SongProps {
  data: SongData;
  rank: number;
}

const TopSong: React.FC<SongProps> = ({ data, rank }) => {
  return (
    <div className="ml-8 flex items-center mr-16">
      <p className="text-xl font-bold mr-4">{rank}</p>
      {/* Đặt margin-right cho phần rank */}
      <img
        src={data.poster}
        alt={data.title}
        className="h-48 w-48 object-cover"
      />
      <div>
        <p className="ml-4">{data.title}</p>
        <p className="ml-4">178,233 monthly listeners</p>
      </div>
    </div>
  );
};

export default TopSong;
