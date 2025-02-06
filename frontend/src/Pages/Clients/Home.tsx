import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import Song from "../../Components/Song";

import axios from "axios";
import LoadingCircle from "../../Components/UtilComponents/LoadingCircle";
import "../../../index.css";

const limit = 4;

export default function Home() {
  const navigate = useNavigate();
  //Songs query
  const [songs, setSongs] = useState<SongData[]>([]);
  const [recentPage, setRecentPage] = useState<number>(1);
  const [totalRecentPage, setTotalRecentPage] = useState<number>(1);
  const [recentLoading, setRecentLoading] = useState(true);

  const email = useSelector((state: any) => state.user.email);

  useEffect(() => {
    setRecentLoading(true);
    axios
      .get<SongData[]>("http://localhost:4000/proxy/api/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: recentPage,
          limit: limit,
        },
      })
      .then((res) => {
        setSongs(res.data);
        setTotalRecentPage(Math.ceil(res.headers["x-total-count"] / limit));
        setRecentLoading(false);
      })
      .catch((err) => console.log(err));
  }, [recentPage]);

  return (
    <>
      <div
        className="bg-zinc-800 h-full"
        style={{ borderRadius: "10px" }}
      >
        <div className="flex flex-row w-full">
          <div className="flex flex-row ml-auto mr-3 mt-6 items-center">
            <UserCircleIcon
              className="text-white w-8 mr-4 cursor-pointer"
              onClick={() => navigate("/home/profile")}
            />
            <p className="text-white">{email}</p>
          </div>
        </div>
        <div className="mt-[16px] mx-3 bg-gray-600 h-[1px]" />
        <div className="mt-[14px] h-full" style={{ overflow: "auto" }}>
          <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
            <div className="flex flex-row justify-between">
              <h2 className="text-2xl text-white my-4 font-bold">Songs</h2>
              <div className="flex flex-row">
                <ChevronLeftIcon
                  color="white"
                  className="w-6 chevron-icon"
                  onClick={() => {
                    recentPage > 1 && setRecentPage(recentPage - 1);
                  }}
                />
                <ChevronRightIcon
                  color="white"
                  className="w-6 chevron-icon"
                  onClick={() => {
                    recentPage < totalRecentPage &&
                      setRecentPage(recentPage + 1);
                  }}
                />
              </div>
            </div>
            {recentLoading ? (
              <LoadingCircle color="white" />
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {songs.map((song) => (
                  <Song key={song._id} data={song} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
