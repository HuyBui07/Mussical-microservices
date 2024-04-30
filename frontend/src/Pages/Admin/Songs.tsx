import { useState } from "react";

interface Song {
  id: number;
  name: string;
  singer: string;
  artist: string;
  source: string;
  poster: string;
}

export default function Songs() {
  const [isModalAddSongOpen, setIsModalAddSongOpen] = useState(false);
  const [isModalAddAlbumOpen, setIsModalAddAlbumOpen] = useState(false);
  const [isModalEditSongOpen, setIsModalEditSongOpen] = useState(false);
  const [isModalEditAlbumOpen, setIsModalEditAlbumOpen] = useState(false);

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [formData, setFormData] = useState<Song>({
    id: 0,
    name: "",
    singer: "",
    artist: "",
    source: "",
    poster: "",
  });

  const data: Song[] = [
    {
      id: 1,
      name: "Shape of You",
      singer: "Ed Sheeran",
      artist: "Ed Sheeran",
      source: "",
      poster: "",
    },
    {
      id: 2,
      name: "Someone Like You",
      singer: "Adele",
      artist: "Adele",
      source: "",
      poster: "",
    },
    {
      id: 3,
      name: "Bohemian Rhapsody",
      singer: "Queen",
      artist: "Freddie Mercury",
      source: "",
      poster: "",
    },
    {
      id: 4,
      name: "Hello",
      singer: "Adele",
      artist: "Adele",
      source: "",
      poster: "",
    },
    {
      id: 5,
      name: "Perfect",
      singer: "Ed Sheeran",
      artist: "Ed Sheeran",
      source: "",
      poster: "",
    },
    {
      id: 6,
      name: "Rolling in the Deep",
      singer: "Adele",
      artist: "Adele",
      source: "",
      poster: "",
    },
    {
      id: 7,
      name: "Thinking Out Loud",
      singer: "Ed Sheeran",
      artist: "Ed Sheeran",
      source: "",
      poster: "",
    },
    {
      id: 8,
      name: "Bohemian Rhapsody",
      singer: "Queen",
      artist: "Freddie Mercury",
      source: "",
      poster: "",
    },
    {
      id: 9,
      name: "Someone You Loved",
      singer: "Lewis Capaldi",
      artist: "Lewis Capaldi",
      source: "",
      poster: "",
    },
    {
      id: 10,
      name: "Happier",
      singer: "Ed Sheeran",
      artist: "Ed Sheeran",
      source: "",
      poster: "",
    },
  ];

  const handleEditSong = (song: Song) => {
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
  const handleSaveImportSong = () => {
    // Logic for importing
    setIsModalAddSongOpen(false); // Open modal for importing
  };

  const handleEditAlbum = (song: Song) => {
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
    setSelectedSong(null);
    setFormData({
      id: 0,
      name: "",
      singer: "",
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
        <div className="pb-8 overflow-x-auto mr-2">
          <table className="mx-3 min-w-full divide-y divide-neutral-700">
            {/* Table headers */}
            <thead className="bg-neutral-900">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-sm font-medium text-white uppercase"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-sm font-medium text-white uppercase"
                >
                  Singer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-start text-sm font-medium text-white uppercase"
                >
                  Artist
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 text-end text-sm font-medium text-white uppercase"
                >
                  Action
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {data.map((song) => (
                <tr key={song.id} className="hover:bg-gray-400">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {song.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {song.singer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {song.artist}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                    <button
                      type="button"
                      onClick={() => handleEditSong(song)}
                      className="mr-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Editing*/}
      {isModalEditSongOpen && (
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
                      Edit Song
                    </h3>
                    {/* Form for edit */}
                    <div className="mt-2">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-black border-2 bg-white rounded-md"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Artist
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-black border-2 bg-white rounded-md"
                          value={formData.artist}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Singer
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-black border-2 bg-white rounded-md"
                          value={formData.singer}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Source
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-black border-2 bg-white rounded-md"
                          value={formData.source}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                        <div className="mt-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Poster
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-black border-2 bg-white rounded-md"
                            value={formData.poster}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSaveSong}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding new Songs*/}
      {isModalAddSongOpen && (
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
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-black border-2 bg-white rounded-md"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Artist
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-black border-2 bg-white rounded-md"
                          value={formData.artist}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Singer
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-black border-2 bg-white rounded-md"
                          value={formData.singer}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Source
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-black border-2 bg-white rounded-md"
                          value={formData.source}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                        <div className="mt-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Poster
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-black border-2 bg-white rounded-md"
                            value={formData.poster}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSaveImportSong}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Albums Management */}
      <div
        className="m-2 ml-4 bg-zinc-800 h-[48vh] overflow-auto"
        style={{ borderRadius: "10px" }}
      >
        <div className="flex justify-between items-center mb-1">
          <p className="font-bold text-xl ml-6 mt-6">Albums</p>
          <button
            onClick={handleImportAlbum}
            className="mt-6 mr-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Import
          </button>
        </div>
        <div className="flex flex-col">
          <div className="m-1.5 overflow-x-auto flex-grow">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden pb-8">
                <table className="min-w-full divide-y divide-neutral-700">
                  <thead className="bg-neutral-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm font-medium text-white uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm font-medium text-white uppercase"
                      >
                        Singer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm font-medium text-white uppercase"
                      >
                        Artist
                      </th>
                      <th
                        scope="col"
                        className="px-8 py-3 text-end text-sm font-medium text-white uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {data.map((song) => (
                      <tr key={song.id} className="hover:bg-gray-400">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {song.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {song.singer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {song.artist}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                          <button
                            type="button"
                            onClick={() => handleEditAlbum(song)}
                            className="mr-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing */}
      {isModalEditAlbumOpen && (
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
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Edit Album
                    </h3>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-black bg-white "
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="text-black border-black border-2 bg-white mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="singer"
                          className="block text-sm font-medium text-black bg-white "
                        >
                          Singer
                        </label>
                        <input
                          type="text"
                          name="singer"
                          id="singer"
                          className="text-black border-black border-2 bg-white mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  rounded-md"
                          value={formData.singer}
                          onChange={(e) =>
                            setFormData({ ...formData, singer: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="artist"
                          className="block text-sm font-medium text-black bg-white"
                        >
                          Artist
                        </label>
                        <input
                          type="text"
                          name="artist"
                          id="artist"
                          className="text-black border-black border-2 bg-white mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black border-2 rounded-md"
                          value={formData.artist}
                          onChange={(e) =>
                            setFormData({ ...formData, artist: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSaveAlbum}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Import new Albums */}
      {isModalAddAlbumOpen && (
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
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Import New Album
                    </h3>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-black bg-white "
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="text-black border-black border-2 bg-white mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="singer"
                          className="block text-sm font-medium text-black bg-white "
                        >
                          Singer
                        </label>
                        <input
                          type="text"
                          name="singer"
                          id="singer"
                          className="text-black border-black border-2 bg-white mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  rounded-md"
                          value={formData.singer}
                          onChange={(e) =>
                            setFormData({ ...formData, singer: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="artist"
                          className="block text-sm font-medium text-black bg-white"
                        >
                          Artist
                        </label>
                        <input
                          type="text"
                          name="artist"
                          id="artist"
                          className="text-black border-black border-2 bg-white mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black border-2 rounded-md"
                          value={formData.artist}
                          onChange={(e) =>
                            setFormData({ ...formData, artist: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="artist"
                          className="block text-sm font-medium text-black bg-white"
                        >
                          List Songs
                        </label>
                        <input
                          type="text"
                          name="artist"
                          id="artist"
                          className="text-black border-black border-2 bg-white mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black border-2 rounded-md"
                          value={formData.artist}
                          onChange={(e) =>
                            setFormData({ ...formData, artist: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSaveImportAlbum}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
