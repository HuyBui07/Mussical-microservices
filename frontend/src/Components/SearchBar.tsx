import { useState } from "react";
import axios from "axios";

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
export default function SearchBar({
  setSearchedSongs,
  invisible = false,
  setLoadingState,
}: {
  setSearchedSongs?: (songs: SongData[]) => void;
  invisible?: boolean;
  setLoadingState?: (loading: boolean) => void;
}): JSX.Element {
  const handleSearch = (searchText: string) => {
    if (setLoadingState) {
      setLoadingState(true);
    }
    if (!setSearchedSongs) {
      return;
    }
    if (!searchText) {
      if (setLoadingState) {
        setLoadingState(false);
      }
      setSearchedSongs([]);
      return;
    }
    axios
      .get<SongData[]>("http://localhost:4000/api/songs/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { title: searchText },
      })
      .then((res) => {
        setSearchedSongs(res.data);
      }).then(() => {
        if (setLoadingState) {
          setLoadingState(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      className={`ml-6 mt-4 flex items-center max-w-sm mx-auto w-[500px] ${
        invisible ? "invisible" : ""
      }`}
      hidden={invisible}
    >
      <label htmlFor="simple-search" className="sr-only text-white">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-8 text-white" />
        </div>
        <input
          type="text"
          id="simple-search"
          className="text-white bg-zinc-400 py-2 border border-gray-300 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12"
          placeholder="Input song title..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </form>
  );
}
