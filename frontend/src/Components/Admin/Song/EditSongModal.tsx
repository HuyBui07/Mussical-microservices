import React, { useEffect, useState } from "react";
import FormField from "../../UtilComponents/FormField";

import { AdminSongItem } from "../../../Pages/Admin/Songs";
import { ServerTagItem, ServerTagResponse, TagField } from "./AddSongModal";

const EditSongModal = ({
  song,

  afterSave,
  closeModal,
}: {
  song: AdminSongItem;

  afterSave: () => void;
  closeModal: () => void;
}) => {
  const [form, setForm] = useState<AdminSongItem>({
    _id: song._id,
    title: song.title,
    artist: song.artist,
    source: song.source,
    poster: song.poster,
    tags: song.tags || [],
  });
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmMDRiNTcyZTcxYzJmMGRmMWI2NDEiLCJpYXQiOjE3MTQzNTc0MzgsImV4cCI6MTcxNDYxNjYzOH0.qWbK65-tM1EfOYEosSziClCkjdmP89Tgla3Gps8oFgs";
  const [saving, setSaving] = useState<boolean>(false);
  const [serverAvailableTags, setServerAvailableTags] =
    useState<ServerTagResponse>({
      tags: [],
    });
  const [loadingTags, setLoadingTags] = useState<boolean>(true);
  const handleSaveEdit = async () => {
    const res = await fetch(`http://localhost:4000/api/songs/${song._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    console.log(res);
  };
  useEffect(() => {
    const fetchTags = async () => {
      setLoadingTags(true);
      const res = await fetch("http://localhost:4000/api/songs/stats/tags", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data: ServerTagItem[] = await res.json();
      setServerAvailableTags({ tags: [...data, { _id: "Other", count: 0 }] });
      setLoadingTags(false);
    };
    fetchTags();
  }, []);
  useEffect(() => {
    console.log("server tags", serverAvailableTags);
  }, [serverAvailableTags]);
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
                value={form.title}
                onChange={(e) => setForm({ ...song, title: e.target.value })}
              />
              <FormField
                label="Artist"
                value={form.artist}
                onChange={(e) => setForm({ ...song, artist: e.target.value })}
              />
              <FormField
                label="Source"
                disabled
                value={form.source}
                onChange={(e) => setForm({ ...song, source: e.target.value })}
              />
              <FormField
                label="Poster"
                disabled
                value={form.poster}
                onChange={(e) => setForm({ ...song, poster: e.target.value })}
              />
              {loadingTags ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <TagField
                  tags={serverAvailableTags.tags.map(
                    (tag: ServerTagItem) => tag._id
                  )}
                  label="Tags of the song"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setForm({
                      ...song,
                      tags: [e.target.value],
                    });
                  }}
                  value={form.tags ? form.tags[0] : ""}
                />
              )}
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
          {saving ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <button
              type="button"
              onClick={async () => {
                setSaving(true);
                await handleSaveEdit();
                afterSave();
                setSaving(false);
              }}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm mr-3"
            >
              Save
            </button>
          )}
          <button
            type="button"
            onClick={closeModal}
            disabled={saving}
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
