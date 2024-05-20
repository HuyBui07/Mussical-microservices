import { useRef, useState } from "react";
import SongTable from "../../Components/Admin/Song/SongTable";
import { SongTableHandle } from "../../Components/Admin/Song/SongTable";
import { SongProps } from "../../Type/type";
import EditSongModal from "../../Components/Admin/Song/EditSongModal";
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
  const [isModalEditSongOpen, setIsModalEditSongOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongProps | null>(null);
  const tableRef = useRef<SongTableHandle>(null);
  const handleEditSong = (song: SongProps) => {
    setSelectedSong(song);
    setIsModalEditSongOpen(true);
  };
  // const afterChange = () => {
  //   // Add logic to save edited data
  //   setIsModalEditSongOpen(false);
  //   setSelectedSong(null);
  // };

  const closeModal = async () => {
    setIsModalEditSongOpen(false);
    setIsModalAddSongOpen(false);
    setSelectedSong(null);
    if (tableRef.current) {
      await tableRef.current.refresh();
    }
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
            onClick={() => setIsModalAddSongOpen(true)}
            className="mt-6 mr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Import
          </button>
        </div>
        {/* Table displaying songs */}
        <SongTable handleEditSong={handleEditSong} ref={tableRef} />
      </div>

      {/* Modal for Editing*/}
      {isModalEditSongOpen && (
        <EditSongModal
          song={selectedSong as SongProps}
          closeModal={closeModal}
          afterSave={closeModal}
        />
      )}

      {/* Modal for Adding new Songs*/}
      {isModalAddSongOpen && (
        <AddSongModal closeModal={closeModal} afterSave={closeModal} />
      )}
    </>
  );
}
