import { SongProps } from "../../../Type/type";

const AlbumTable = ({
  data,
  handleEditAlbum,
  handleImportAlbum,
}: {
  data: SongProps[];
  handleEditAlbum: (song: SongProps) => void;
  handleImportAlbum: () => void;
}) => {
  return (
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
                    <tr key={song._id} className="hover:bg-gray-400">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 dark:text-neutral-200">
                        {song.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 dark:text-neutral-200">
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
  );
};

export default AlbumTable;
