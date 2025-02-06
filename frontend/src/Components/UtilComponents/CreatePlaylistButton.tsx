import { useState } from "react";
import CreatePlaylistPopup from "./CreatePlaylistPopup";
interface CreatePlaylistButtonProps {
  updatePlaylists: (playlistName: string) => void;
}
const CreatePlaylistButton = ({
  updatePlaylists,
}: CreatePlaylistButtonProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  return (
    <>
      <button
        className="flex items-center text-white rounded px-4 py-2 transition-colors duration-300 bg-gray-700 hover:bg-gray-800"
        onClick={() => setShowPopup(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zM5 10a1 1 0 1 0 0-2h4a1 1 0 1 0 0 2H5zm10-3a1 1 0 1 0-2 0v4a1 1 0 0 0 2 0V7zm-7.293 9.293a1 1 0 0 0 1.414 1.414l4-4a1 1 0 0 0-1.414-1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
        Create Playlist
      </button>
      {showPopup && (
        <CreatePlaylistPopup
          message="Enter the name of the playlist"
          afterConfirm={(playlistName) => {
            setShowPopup(false);
            updatePlaylists(playlistName);
          }}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default CreatePlaylistButton;
