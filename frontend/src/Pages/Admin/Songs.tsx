import { useState } from "react";
import SongTable from "../../Components/Admin/Song/SongTable";

import { SongProps } from "../../Type/type";
import EditSongModal from "../../Components/Admin/Song/EditSongModal";
import AddSongModal from "../../Components/Admin/Song/AddSongModal";
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
  const [selectedSong, setSelectedSong] = useState<SongProps | null>(null);
  const [formData, setFormData] = useState<SongProps>({
    id: 0,
    title: "",
    artist: "",
    source: "",
    poster: "",
  });

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
        <SongTable handleEditSong={handleEditSong} />
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
