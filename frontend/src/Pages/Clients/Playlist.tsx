/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

import NavBar from "../../Components/NavBar";
import axios from "axios";
import PlaylistItem from "../../Components/PlaylistItem";
import PlaylistSongItem from "../../Components/SongItem";

import CreatePlaylistButton from "../../Components/UtilComponents/CreatePlaylistButton";

const Playlist: React.FC = () => {
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistData | null>(
    null
  );

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = () => {
    // Fetch playlists of the current user
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get<PlaylistData[]>("http://localhost:4000/api/playlists/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setPlaylists(res.data))
        .catch((err) => console.log("Error fetching playlists: ", err));
    }
  };
  const handlePlaylistSelect = (playlist: PlaylistData) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <>
      <div
        className="m-2 mb-2 ml-4 bg-zinc-800 h-[80%]"
        style={{ borderRadius: "10px" }}
      >
        <NavBar />
        <div className="my-[14px] mx-3 bg-gray-600 h-[1px]" />
        <div style={{ overflow: "hidden", position: "relative" }}>
          {/* Display playlists */}
          {!selectedPlaylist ? (
            <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
              <div className="flex justify-between items-center">
                <h2
                  style={{ color: "white" }}
                  className="text-2xl my-4 font-bold"
                >
                  My Playlists
                </h2>
                <CreatePlaylistButton
                  updatePlaylists={fetchPlaylists}
                ></CreatePlaylistButton>
              </div>
              <div
                className="grid grid-cols-1 gap-y-4"
                style={{ marginBottom: "1rem" }}
              >
                {playlists.map((playlist) => (
                  <PlaylistItem
                    key={playlist._id}
                    playlist={playlist}
                    onSelect={handlePlaylistSelect}
                    onRemove={fetchPlaylists}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Display songs of selected playlist
            <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
              <button
                className="text-white mb-4"
                onClick={() => setSelectedPlaylist(null)}
              >
                &larr; Back
              </button>
              <h2
                style={{ color: "white" }}
                className="text-2xl my-4 font-bold"
              >
                {selectedPlaylist.name}
              </h2>
              <div className="grid grid-cols-1 gap-y-4">
                {selectedPlaylist.songs.map((songId) => (
                  <PlaylistSongItem
                    key={songId}
                    songId={songId}
                    playListId={selectedPlaylist._id}
                    onRemove={() => {
                      //If play list has 0 song , set null
                      if (selectedPlaylist.songs.length === 1) {
                        setSelectedPlaylist(null);
                      } else {
                        setSelectedPlaylist({
                          ...selectedPlaylist,
                          songs: selectedPlaylist.songs.filter(
                            (id) => id !== songId
                          ),
                        });
                      }

                      fetchPlaylists();
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Playlist;
