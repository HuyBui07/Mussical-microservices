import React from "react";
import FormField from "../../UtilComponents/FormField";
import { SongProps } from "../../../Type/type";

const EditSongModal = ({
  formData,
  setFormData,
  handleSaveSong,
  closeModal,
}: {
  formData: SongProps;
  setFormData: React.Dispatch<React.SetStateAction<SongProps>>;
  handleSaveSong: () => void;
  closeModal: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-opacity-75 bg-gray-700 flex justify-center items-center">
      {/* Modal container */}
      <div className="bg-white rounded-lg overflow-hidden shadow-xl sm:max-w-lg w-full">
        {/* Modal content */}
        <div className="px-4 pt-5 pb-4 sm:p-6">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Edit Song
            </h3>
            {/* Form for edit */}
            <div className="mt-4">
              <FormField
                label="Name"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <FormField
                label="Artist"
                value={formData.artist}
                onChange={(e) =>
                  setFormData({ ...formData, artist: e.target.value })
                }
              />
              <FormField
                label="Source"
                value={formData.source}
                onChange={(e) =>
                  setFormData({ ...formData, source: e.target.value })
                }
              />
              <FormField
                label="Poster"
                value={formData.poster}
                onChange={(e) =>
                  setFormData({ ...formData, poster: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
          <button
            type="button"
            onClick={handleSaveSong}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm mr-3"
          >
            Save
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSongModal;
