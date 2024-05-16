import { useState } from "react";
import SongTable from "../../Components/Admin/Song/SongTable";

import { AlbumProps, SongProps } from "../../Type/type";
import EditSongModal from "../../Components/Admin/Song/EditSongModal";
import AddSongModal from "../../Components/Admin/Song/AddSongModal";
import AlbumTable from "../../Components/Admin/Song/AlbumTable";
import EditAlbumModal from "../../Components/Admin/Song/EditAlbumModal";
import AddNewAlbumModal from "../../Components/Admin/Song/AddNewAlbumModal";
export default function Songs() {
  const [isModalAddSongOpen, setIsModalAddSongOpen] = useState(false);
  const [isModalAddAlbumOpen, setIsModalAddAlbumOpen] = useState(false);
  const [isModalEditSongOpen, setIsModalEditSongOpen] = useState(false);
  const [isModalEditAlbumOpen, setIsModalEditAlbumOpen] = useState(false);

  const [selectedSong, setSelectedSong] = useState<SongProps | null>(null);
  const [formData, setFormData] = useState<SongProps>({
    id: 0,
    title: "",
    artist: "",
    source: "",
    poster: "",
  });
  const [albumFormData, setAlbumFormData] = useState<AlbumProps>({
    id: 0,
    name: "",
    artist: "",
    listSongs: [],
  });
  const data: SongProps[] = [
    {
      id: 1,
      title: "Shape of You",

      artist: "Ed Sheeran",
      source: "",
      poster: "",
    },
    {
      id: 2,
      title: "Someone Like You",

      artist: "Adele",
      source: "",
      poster: "",
    },
    {
      id: 3,
      title: "Bohemian Rhapsody",

      artist: "Freddie Mercury",
      source: "",
      poster: "",
    },
    {
      id: 4,
      title: "Hello",

      artist: "Adele",
      source: "",
      poster: "",
    },
    {
      id: 5,
      title: "Perfect",

      artist: "Ed Sheeran",
      source: "",
      poster: "",
    },
    {
      id: 6,
      title: "Rolling in the Deep",

      artist: "Adele",
      source: "",
      poster: "",
    },
    {
      id: 7,
      title: "Thinking Out Loud",

      artist: "Ed Sheeran",
      source: "",
      poster: "",
    },
    {
      id: 8,
      title: "Bohemian Rhapsody",

      artist: "Freddie Mercury",
      source: "",
      poster: "",
    },
    {
      id: 9,
      title: "Someone You Loved",

      artist: "Lewis Capaldi",
      source: "",
      poster: "",
    },
    {
      id: 10,
      title: "Happier",

      artist: "Ed Sheeran",
      source: "",
      poster: "",
    },
  ];

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
  };

  const handleEditAlbum = (song: SongProps) => {
    setSelectedSong(song);
    setFormData({ ...song });
    setIsModalEditAlbumOpen(true);
  };

  const handleSaveAlbum = () => {
    // Add logic to save edited data
    setIsModalEditAlbumOpen(false);
  };
  const handleImportAlbum = () => {
    // Add logic to save edited data
    setIsModalAddAlbumOpen(true);
  };

  const handleSaveImportAlbum = () => {
    // Logic for importing
    setIsModalAddAlbumOpen(false); // Open modal for importing
  };
  const closeModal = () => {
    // tạm thời thôi nhớ sửa nha
    setIsModalEditAlbumOpen(false);
    setIsModalEditSongOpen(false);
    setIsModalAddAlbumOpen(false);
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
        className="m-2  ml-4 bg-zinc-800 h-[48vh] overflow-auto"
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
          setFormData={setFormData}
          formData={formData}
          closeModal={closeModal}
          handleSaveImportSong={handleSaveImportSong}
        />
      )}

      {/* Albums Management */}
      <AlbumTable
        data={data}
        handleEditAlbum={handleEditAlbum}
        handleImportAlbum={handleImportAlbum}
      />
      {/* Modal for Editing */}
      {isModalEditAlbumOpen && (
        <EditAlbumModal
          setFormData={setFormData}
          formData={formData}
          closeModal={closeModal}
          handleSaveAlbum={handleSaveAlbum}
        />
      )}

      {/* Modal for Import new Albums */}
      {isModalAddAlbumOpen && (
        <AddNewAlbumModal
          setFormData={setAlbumFormData}
          formData={albumFormData}
          closeModal={closeModal}
          handleSaveImportAlbum={handleSaveImportAlbum}
        />
      )}
    </>
  );
}
