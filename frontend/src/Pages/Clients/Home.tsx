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
import AddToPlaylistPopup from "../../Components/UtilComponents/AddToPlaylistPopup";
import LoadingCircle from "../../Components/UtilComponents/LoadingCircle";
import { useSongData } from "../../Layout/ClientLayout/ClientLayout";
import "../../../index.css";

const limit = 4;

export default function Home() {
  const navigate = useNavigate();
  //Songs query
  const [recentSongs, setRecentSongs] = useState<SongData[]>([]);
  const [forYouSongs, setForYouSongs] = useState<SongData[]>([]);
  const [recentPage, setRecentPage] = useState<number>(1);
  const [totalRecentPage, setTotalRecentPage] = useState<number>(1);
  const [forYouPage, setForYouPage] = useState<number>(1);
  const [totalForYouPage, setTotalForYouPage] = useState<number>(1);
  const [recentLoading, setRecentLoading] = useState(true);
  const [forYouLoading, setForYouLoading] = useState(true);
  //Add to playlist popup
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentAddSong, setCurrentAddSong] = useState<SongData | null>(null);

  const email = useSelector((state: any) => state.user.email);

  // Use the global song context
  const {
    selectedSong,

    setAutoRecommend,
  } = useSongData();

  useEffect(() => {
    setRecentLoading(true);
    axios
      .get<SongData[]>("http://localhost:4000/api/songs/recent", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: recentPage,
          limit: limit,
        },
      })
      .then((res) => {
        setRecentSongs(res.data);
        setTotalRecentPage(Math.ceil(res.headers["x-total-count"] / limit));
        setRecentLoading(false);
      })
      .catch((err) => console.log(err));
  }, [recentPage]);

  useEffect(() => {
    setForYouLoading(true);
    axios
      .get<SongData[]>("http://localhost:4000/api/songs/for-you", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: forYouPage,
          limit: limit,
        },
      })
      .then((res) => {
        setForYouSongs(res.data);
        setTotalForYouPage(Math.ceil(res.headers["x-total-count"] / limit));
        setForYouLoading(false);
      })
      .catch((err) => console.log(err));
  }, [forYouPage]);

  useEffect(() => {
    setAutoRecommend && setAutoRecommend(true);
  }, []);
  useEffect(() => {}, []);

  const handleAddToPlaylistPopup = () => {
    setShowPopup(true);
  };

  const handleCancelAddToPlaylist = () => {
    setCurrentAddSong(null);
    setShowPopup(false);
  };

  return (
    <>
      <div
        className="m-2 ml-4 bg-zinc-800 h-full"
        style={{ borderRadius: "10px" }}
      >
        <div className="flex flex-row w-full">
          <div className="flex flex-row items-center ml-3 mt-6">
            <span className="text-white text-lg font-semibold mr-2">
              Song mood:
            </span>
            {selectedSong?.tags?.map((tag) => (
              <span
                className="text-white bg-gradient-to-r from-green-400 to-blue-500 px-3 py-1 m-1 rounded-full shadow-lg"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-row ml-auto mr-3 mt-6 items-center">
            <UserCircleIcon
              className="text-white w-8 mr-4 cursor-pointer"
              onClick={() => navigate("/home/profile")}
            />
            <p className="text-white">{email}</p>
          </div>
        </div>
        <div className="mt-[14px] mx-3 bg-gray-600 h-[1px]" />
        <div className="mt-[14px] h-[70vh]" style={{ overflow: "auto" }}>
          <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
            <div className="flex flex-row justify-between">
              <h2 className="text-lg text-white my-4 font-bold">New songs</h2>
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
                {recentSongs.map((song) => (
                  <Song
                    key={song._id}
                    data={song}
                    onClickAdd={() => {
                      setCurrentAddSong(song);
                      handleAddToPlaylistPopup();
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="mt-[14px] mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
            <div className="flex flex-row justify-between">
              <h2 className="text-lg text-white my-4 font-bold">
                Based on tags you like
              </h2>
              <div className="flex flex-row">
                <ChevronLeftIcon
                  color="white"
                  className="w-6 chevron-icon"
                  onClick={() => {
                    forYouPage > 1 && setForYouPage(forYouPage - 1);
                  }}
                />
                <ChevronRightIcon
                  color="white"
                  className="w-6 chevron-icon"
                  onClick={() => {
                    forYouPage < totalForYouPage &&
                      setForYouPage(forYouPage + 1);
                  }}
                />
              </div>
            </div>
            {forYouLoading ? (
              <LoadingCircle color="white" />
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {forYouSongs.map((song) => (
                  <Song
                    key={song._id}
                    data={song}
                    onClickAdd={() => {
                      setCurrentAddSong(song);
                      handleAddToPlaylistPopup();
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <AddToPlaylistPopup
          songId={currentAddSong?._id}
          message="Add to Playlist"
          afterConfirm={() => setShowPopup(false)}
          onCancel={handleCancelAddToPlaylist}
        />
      )}
    </>
  );
}
