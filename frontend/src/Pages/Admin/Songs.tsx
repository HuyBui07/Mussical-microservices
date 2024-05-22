import { useEffect, useState } from "react";
import SongTable from "../../Components/Admin/Song/SongTable";

import { SongProps } from "../../Type/type";
import EditSongModal from "../../Components/Admin/Song/EditSongModal";
import AddSongModal from "../../Components/Admin/Song/AddSongModal";
import axios from "axios";
export interface AdminSongItem {
  id: number;
  title: string;
  artist: string;
  source: string;
  poster: string;
  listenCount?: number;
  tags?: string[];
}
export default function Songs() {
  const [isModalAddSongOpen, setIsModalAddSongOpen] = useState(false);
  const [isModalEditSongOpen, setIsModalEditSongOpen] = useState(false);
  const [data, setData] = useState<AdminSongItem[]>([]);
  const [selectedSong, setSelectedSong] = useState<SongProps | null>(null);
  const [formData, setFormData] = useState<SongProps>({
    id: 0,
    title: "",
    artist: "",
    source: "",
    poster: "",
  });
  useEffect(() => {
    // Fetch data from API
    axios
      .get<AdminSongItem[]>("http://localhost:4000/api/songs/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  // const data: AdminSongItem[] = [
  //   {
  //     id: 1,
  //     title: "Shape of You",

  //     artist: "Ed Sheeran",
  //     source: "",
  //     poster: "",
  //   },
  //   {
  //     id: 2,
  //     title: "Someone Like You",

  //     artist: "Adele",
  //     source: "",
  //     poster: "",
  //   },
  //   {
  //     id: 3,
  //     title: "Bohemian Rhapsody",

  //     artist: "Freddie Mercury",
  //     source: "",
  //     poster: "",
  //   },
  //   {
  //     id: 4,
  //     title: "Hello",

  //     artist: "Adele",
  //     source: "",
  //     poster: "",
  //   },
  //   {
  //     id: 5,
  //     title: "Perfect",

  //     artist: "Ed Sheeran",
  //     source: "",
  //     poster: "",
  //   },
  //   {
  //     id: 6,
  //     title: "Rolling in the Deep",

  //     artist: "Adele",
  //     source: "",
  //     poster: "",
  //   },
  //   {
  //     id: 7,
  //     title: "Thinking Out Loud",

  //     artist: "Ed Sheeran",
  //     source: "",
  //     poster: "",
  //   },
  //   {
  //     id: 8,
  //     title: "Bohemian Rhapsody",

  //     artist: "Freddie Mercury",
  //     source: "",
  //     poster: "",
  //   },
  //   {
  //     id: 9,
  //     title: "Someone You Loved",

  //     artist: "Lewis Capaldi",
  //     source: "",
  //     poster: "",
  //   },
  //   {
  //     id: 10,
  //     title: "Happier",

  //     artist: "Ed Sheeran",
  //     source: "",
  //     poster: "",
  //   },
  // ];

  const handleEditSong = (song: SongProps) => {
    setSelectedSong(song);
    setFormData({ ...song });
    setIsModalEditSongOpen(true);
  };
  const handleSaveSong = () => {
    // Add logic to save edited data
    setIsModalEditSongOpen(false);
  };

  const handleImportSong = () => {
    // Add logic to save edited data
    setIsModalAddSongOpen(true);
  };

  // Function to handle importing
  //Return SongProps
  const handleSaveImportSong = () => {
    // Logic for importing
    setIsModalAddSongOpen(false); // Open modal for importing
    closeModal();
  };

  const closeModal = () => {
    // tạm thời thôi nhớ sửa nha
    setIsModalEditSongOpen(false);
    setIsModalAddSongOpen(false);
    setSelectedSong(null);
    setFormData({
      id: 0,
      title: "",
      artist: "",
      source: "",
      poster: "",
    });
  };

  return (
    <>
      {/* Songs Management */}
      <div
        className="m-2  ml-4 bg-zinc-800 h-[80vh]"
        style={{ borderRadius: "10px" }}
      >
        <div className="flex justify-between items-center mb-4 ">
          <p className="font-bold text-xl ml-6 mt-6">Songs</p>
          <button
            onClick={handleImportSong}
            className="mt-6 mr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Import
          </button>
        </div>
        {/* Table displaying songs */}
        <SongTable data={data} handleEditSong={handleEditSong} />
      </div>

      {/* Modal for Editing*/}
      {isModalEditSongOpen && (
        <EditSongModal
          setFormData={setFormData}
          formData={formData}
          closeModal={closeModal}
          handleSaveSong={handleSaveSong}
        />
      )}

      {/* Modal for Adding new Songs*/}
      {isModalAddSongOpen && (
        <AddSongModal
          closeModal={closeModal}
          afterSave={handleSaveImportSong}
        />
      )}
    </>
  );
}
