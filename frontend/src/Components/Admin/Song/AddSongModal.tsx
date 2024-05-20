import React, { useState } from "react";
import FormField from "../../UtilComponents/FormField";

export interface SongUploadProps {
  title: string;
  artist: string;
  posterFile: File | undefined | null;
  sourceFile: File | undefined | null;
}

const AddSongModal = ({
  closeModal,
  afterSave,
}: {
  closeModal: () => void;
  afterSave: () => void;
}) => {
  const [formData, setFormData] = useState<SongUploadProps>({
    title: "",
    artist: "",
    posterFile: null,
    sourceFile: null,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setLoading(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmMDRiNTcyZTcxYzJmMGRmMWI2NDEiLCJpYXQiOjE3MTQzNTc0MzgsImV4cCI6MTcxNDYxNjYzOH0.qWbK65-tM1EfOYEosSziClCkjdmP89Tgla3Gps8oFgs";
    const data = new FormData();
    data.append("title", formData.title);
    data.append("artist", formData.artist);
    if (formData.posterFile) {
      data.append("posterFile", formData.posterFile);
    }
    if (formData.sourceFile) {
      data.append("sourceFile", formData.sourceFile);
    }
    console.log("Data before fetch", data);
    try {
      const response = await fetch("http://localhost:4000/api/songs", {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      afterSave();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={closeModal}
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Modal content */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  Import New Songs
                </h3>
                {/* Form for importing */}
                <div className="mt-2">
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

                  <UploadFormField
                    label="Poster"
                    value={formData.posterFile || undefined}
                    fileType={["image/*"]}
                    uploadDescription="File accepted: jpg, jpeg, png"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        posterFile: e.target.files?.[0],
                      })
                    }
                  />
                  <UploadFormField
                    label="Source"
                    value={formData.sourceFile || undefined}
                    fileType={["audio/*"]}
                    uploadDescription="File accepted: mp3"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sourceFile: e.target.files?.[0],
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Modal footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSave}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Save"
              )}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 ${
                loading ? "cursor-not-allowed" : "hover:bg-gray-50"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSongModal;

const UploadFormField = ({
  label,
  fileType,
  value,
  onChange,
  uploadDescription,
}: {
  label: string;
  value: File | null | undefined;
  fileType: string[];
  uploadDescription: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <label
        htmlFor="file-upload"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M24 14v10m0 0v10m0-10h10m-10 0H14"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={`file-upload-${label}`}
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              {value ? ( // If value is not empty, show the file name
                <span className="justify-center text-blue-600 font-medium">
                  {value.name}
                </span>
              ) : (
                <span>Upload a file</span>
              )}

              <input
                id={`file-upload-${label}`}
                name="file-upload"
                type="file"
                accept={fileType.join(",")}
                className="sr-only"
                onChange={onChange}
              />
            </label>
            {value ? <></> : <p className="pl-1">or drag and drop</p>}
          </div>
          {/* If fileType is image, show the image preview */}
          {fileType.includes("image/*") && value && (
            //Center the image
            <div className="flex justify-center">
              <img
                src={URL.createObjectURL(value)}
                alt="preview"
                className="h-20 w-20"
              />
            </div>
          )}
          <p className="text-xs text-gray-500">{uploadDescription}</p>
          {value && <p className="text-xs text-gray-500">{value.size} bytes</p>}
        </div>
      </div>
    </div>
  );
};
