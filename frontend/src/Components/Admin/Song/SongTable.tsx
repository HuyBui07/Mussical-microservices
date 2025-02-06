import {
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { AdminSongItem } from "../../../Pages/Admin/Songs";
import axios from "axios";
import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
const limit = 7;
export interface SongTableHandle {
  refresh: () => void;
}

const SongTable = forwardRef<
  SongTableHandle,
  { handleEditSong: (song: AdminSongItem) => void }
>(({ handleEditSong }, ref) => {
  const [data, setData] = useState<AdminSongItem[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  useEffect(() => {
    fetchSongs();
  }, [page]);

  const fetchSongs = async () => {
    const adminToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmMDRiNTcyZTcxYzJmMGRmMWI2NDEiLCJpYXQiOjE3MTQzNTc0MzgsImV4cCI6MTcxNDYxNjYzOH0.qWbK65-tM1EfOYEosSziClCkjdmP89Tgla3Gps8oFgs";
    axios
      .get<AdminSongItem[]>("http://localhost:4000/api/songs/stats/songs", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        params: {
          page: page,
          limit: limit,
        },
      })
      .then((res) => {
        setData(res.data);
        //extract X-Total-Count from Response header
        setCount(parseInt(res.headers["x-total-count"]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpen = (id: number) => {
    setSelectedSongId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSongId(null);
  };
  // Expose the fetchSongs function to the parent component
  useImperativeHandle(ref, () => ({
    refresh: fetchSongs,
  }));
  const handleDelete = async (id: number) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmMDRiNTcyZTcxYzJmMGRmMWI2NDEiLCJpYXQiOjE3MTQzNTc0MzgsImV4cCI6MTcxNDYxNjYzOH0.qWbK65-tM1EfOYEosSziClCkjdmP89Tgla3Gps8oFgs";
    try {
      await axios.delete(`http://localhost:4000/api/songs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchSongs();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return (
    <>
      <div className="pb-8 overflow-x-auto mr-2">
        <div className="relative mx-3 min-w-full divide-y divide-neutral-700">
          <table className="min-w-full divide-y divide-neutral-700">
            <thead className="bg-neutral-900 sticky top-0 z-10">
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
                  className="px-6 py-3 text-end text-sm font-medium text-white uppercase"
                >
                  Listen count
                </th>

                <th
                  scope="col"
                  className="px-8 py-3 text-end text-sm font-medium text-white uppercase"
                >
                  Action
                </th>
              </tr>
            </thead>
          </table>
          <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
            <table className="min-w-full divide-y divide-neutral-700">
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {data.map((song: AdminSongItem) => (
                  <tr
                    key={song._id}
                    className="hover:bg-gray-600 dark:hover:bg-neutral-800"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 dark:text-neutral-100">
                      {song.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 dark:text-neutral-100">
                      {song.artist}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 dark:text-neutral-100">
                      {song.listenCount}
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
                        onClick={() => handleOpen(song._id)}
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
        </div>
      </div>

      <Pagination
        count={Math.ceil(count / limit)}
        shape="rounded"
        color="secondary"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white",
          },
          "& .Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            color: "white",
          },
          "& .MuiPaginationItem-page:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        }}
        className="mt-4"
        onChange={(e, page) => setPage(page)}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Song"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this song?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={deleting} onClick={handleClose}>
            Cancel
          </Button>

          {deleting ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Button
              onClick={async () => {
                setDeleting(true);
                await handleDelete(selectedSongId as number);
                setDeleting(false);
                handleClose();
              }}
              autoFocus
            >
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
});

export default SongTable;
