import { SongProps } from "../../../Type/type";

const SongTable = ({
  data,
  handleEditSong,
}: {
  data: SongProps[];
  handleEditSong: (song: SongProps) => void;
}) => {
  return (
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
          {data.map((song: SongProps) => (
            <tr
              key={song.id}
              className="hover:bg-gray-600 dark:hover:bg-neutral-800"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 dark:text-neutral-100">
                {song.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 dark:text-neutral-100">
                {song.artist}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                <button
                  type="button"
                  onClick={() => handleEditSong(song)}
                  className="mr-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongTable;
