export default function PlaylistDetail() {
  return (
    <div className="bg-black text-gray-300 min-h-screen p-10">
      {/* header */}
      <div className="flex">
        <img className="mr-6" src="https://placekitten.com/g/200/200" />
        <div className="flex flex-col justify-center">
          {/* content */}
          <h4 className="mt-0 mb-2 uppercase text-gray-500 tracking-widest text-xs">
            Playlist
          </h4>
          <h1 className="mt-0 mb-2 text-white text-4xl">
            Spotify Album Page with Tailwind CSS
          </h1>
          <p className="text-gray-600 mb-2 text-sm">
            With J. Cole, Quavo, Ty Dollar $ign
          </p>
          <p className="text-gray-600 text-sm">
            Created by <a>Spotify</a> - 50 songs, 3 hr 2 min
          </p>
        </div>
      </div>
      {/* action buttons */}
      <div className="mt-6 flex justify-between">
        <div className="flex">
          <button className="mr-2 bg-green-500 text-green-100 block py-2 px-8 rounded-full">
            Play
          </button>
          <button className="mr-2 border border-white block p-2 rounded-full">
            <img
              src="https://image.flaticon.com/icons/svg/2485/2485986.svg"
              height={25}
              width={25}
            />
          </button>
          <button className="mr-2 border border-white block p-2 rounded-full">
            ...
          </button>
        </div>
        <div className="text-gray-600 text-sm tracking-widest text-right">
          <h5 className="mb-1">Followers</h5>
          <p>5,055</p>
        </div>
      </div>
      {/* song list   */}
      <div className="mt-10">
        {/* song list header */}
        <div className="flex text-gray-600">
          <div className="p-2 w-8 flex-shrink-0" />
          <div className="p-2 w-8 flex-shrink-0" />
          <div className="p-2 w-full">Title</div>
          <div className="p-2 w-full">Artist</div>
          <div className="p-2 w-full">Album</div>
          <div className="p-2 w-12 flex-shrink-0 text-right">⏱</div>
        </div>
        <div className="flex border-b border-gray-800 hover:bg-gray-800">
          <div className="p-3 w-8 flex-shrink-0">▶️</div>
          <div className="p-3 w-8 flex-shrink-0">❤️</div>
          <div className="p-3 w-full">My Song Here</div>
          <div className="p-3 w-full">Eminem</div>
          <div className="p-3 w-full">Spotify</div>
          <div className="p-3 w-12 flex-shrink-0 text-right">5:35</div>
        </div>
        <div className="flex border-b border-gray-800 hover:bg-gray-800">
          <div className="p-3 w-8 flex-shrink-0">▶️</div>
          <div className="p-3 w-8 flex-shrink-0">❤️</div>
          <div className="p-3 w-full">My Song Here</div>
          <div className="p-3 w-full">Eminem</div>
          <div className="p-3 w-full">Spotify</div>
          <div className="p-3 w-12 flex-shrink-0 text-right">5:35</div>
        </div>
        <div className="flex border-b border-gray-800 hover:bg-gray-800">
          <div className="p-3 w-8 flex-shrink-0">▶️</div>
          <div className="p-3 w-8 flex-shrink-0">❤️</div>
          <div className="p-3 w-full">My Song Here</div>
          <div className="p-3 w-full">Eminem</div>
          <div className="p-3 w-full">Spotify</div>
          <div className="p-3 w-12 flex-shrink-0 text-right">5:35</div>
        </div>
        <div className="flex border-b border-gray-800 hover:bg-gray-800">
          <div className="p-3 w-8 flex-shrink-0">▶️</div>
          <div className="p-3 w-8 flex-shrink-0">❤️</div>
          <div className="p-3 w-full">My Song Here</div>
          <div className="p-3 w-full">Eminem</div>
          <div className="p-3 w-full">Spotify</div>
          <div className="p-3 w-12 flex-shrink-0 text-right">5:35</div>
        </div>
        <div className="flex border-b border-gray-800 hover:bg-gray-800">
          <div className="p-3 w-8 flex-shrink-0">▶️</div>
          <div className="p-3 w-8 flex-shrink-0">❤️</div>
          <div className="p-3 w-full">My Song Here</div>
          <div className="p-3 w-full">Eminem</div>
          <div className="p-3 w-full">Spotify</div>
          <div className="p-3 w-12 flex-shrink-0 text-right">5:35</div>
        </div>
      </div>
    </div>
  );
}
