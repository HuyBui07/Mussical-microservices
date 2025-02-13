import { useEffect, useState } from "react";
import LoadingCircle from "../../Components/UtilComponents/LoadingCircle";

import AddSongModal from "../../Components/Admin/Song/AddSongModal";
export interface AdminSongItem {
  _id: number;
  title: string;
  artist: string;
  source: string;
  poster: string;
  listenCount?: number;
  tags?: string[];
}
export default function Songs() {
  const [isModalAddSongOpen, setIsModalAddSongOpen] = useState(false);
  const [songs, setSongs] = useState<AdminSongItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate loading
      const response = await fetch("http://localhost:4000/proxy/api/all");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched songs:", data); // Debugging log
      setSongs(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch songs:", error);
    }
  };

  const closeModal = async () => {
    setIsModalAddSongOpen(false);
    await fetchSongs();
  };

  const handleDelete = async (title: string) => {
    // Implement delete song
    try {
      const response = await fetch("http://localhost:4000/proxy/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmMDRiNTcyZTcxYzJmMGRmMWI2NDEiLCJpYXQiOjE3MTQzNTc0MzgsImV4cCI6MTcxNDYxNjYzOH0.qWbK65-tM1EfOYEosSziClCkjdmP89Tgla3Gps8oFgs",
        },
        body: JSON.stringify({ title: title }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchSongs();
    } catch (error) {
      console.error("Failed to delete song:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <>
      {/* Songs Management */}
      <div className="bg-zinc-800 h-full" style={{ borderRadius: "10px" }}>
        <div className="flex justify-between items-center mb-4 ">
          <p className="font-bold text-xl ml-6 mt-6">Songs</p>
          <button
            onClick={() => setIsModalAddSongOpen(true)}
            className="mt-6 mr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Import
          </button>
        </div>

        {/* Songs Table */}
        <div className="mx-6">
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">
                  Title
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">
                  Artist
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">
                  Listen Count
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">
                  Tags
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <div className="flex justify-center items-center m-auto mt-10 mb-10">
                  <LoadingCircle />
                </div>
              ) : (
                songs.map((song) => (
                  <tr key={song._id}>
                    <td className="text-left py-3 px-4">{song.title}</td>
                    <td className="text-left py-3 px-4">{song.artist}</td>
                    <td className="text-left py-3 px-4">{song.listenCount}</td>
                    <td className="text-left py-3 px-4">
                      {song.tags && song.tags.join(", ")}
                    </td>
                    <td className="text-left py-3 px-4">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(song.title)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding new Songs*/}
      {isModalAddSongOpen && (
        <AddSongModal closeModal={closeModal} afterSave={closeModal} />
      )}
    </>
  );
}
