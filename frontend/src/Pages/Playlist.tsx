import MusicPlayer from "../Components/MusicPlayer";
import NavBar from "../Components/NavBar";
export default function Playlist() {
  const songs = [
    {
      id: 1,
      name: "Chúng ta của tương lai",
      href: "#",
      imageSrc:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvariety.com%2Fwp-content%2Fuploads%2F2022%2F08%2FScreen-Shot-2022-08-31-at-9.53.54-PM.png%3Fw%3D1024&f=1&nofb=1&ipt=eebdbd7c2cf5fb360a0552788590e9061419d08c2b7167f55ecb6c51df1292d7&ipo=images",
    },
    {
      id: 2,
      name: "Chúng ta của tương lai",
      href: "#",
      imageSrc:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvariety.com%2Fwp-content%2Fuploads%2F2022%2F08%2FScreen-Shot-2022-08-31-at-9.53.54-PM.png%3Fw%3D1024&f=1&nofb=1&ipt=eebdbd7c2cf5fb360a0552788590e9061419d08c2b7167f55ecb6c51df1292d7&ipo=images",
    },
    {
      id: 3,
      name: "Chúng ta của tương lai",
      href: "#",
      imageSrc:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvariety.com%2Fwp-content%2Fuploads%2F2022%2F08%2FScreen-Shot-2022-08-31-at-9.53.54-PM.png%3Fw%3D1024&f=1&nofb=1&ipt=eebdbd7c2cf5fb360a0552788590e9061419d08c2b7167f55ecb6c51df1292d7&ipo=images",
    },
    {
      id: 4,
      name: "Chúng ta của tương lai",
      href: "#",
      imageSrc:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvariety.com%2Fwp-content%2Fuploads%2F2022%2F08%2FScreen-Shot-2022-08-31-at-9.53.54-PM.png%3Fw%3D1024&f=1&nofb=1&ipt=eebdbd7c2cf5fb360a0552788590e9061419d08c2b7167f55ecb6c51df1292d7&ipo=images",
    },
    {
      id: 5,
      name: "Chúng ta của tương lai",
      href: "#",
      imageSrc:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvariety.com%2Fwp-content%2Fuploads%2F2022%2F08%2FScreen-Shot-2022-08-31-at-9.53.54-PM.png%3Fw%3D1024&f=1&nofb=1&ipt=eebdbd7c2cf5fb360a0552788590e9061419d08c2b7167f55ecb6c51df1292d7&ipo=images",
    },
    {
      id: 6,
      name: "Chúng ta của tương lai",
      href: "#",
      imageSrc:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvariety.com%2Fwp-content%2Fuploads%2F2022%2F08%2FScreen-Shot-2022-08-31-at-9.53.54-PM.png%3Fw%3D1024&f=1&nofb=1&ipt=eebdbd7c2cf5fb360a0552788590e9061419d08c2b7167f55ecb6c51df1292d7&ipo=images",
    },
    {
      id: 7,
      name: "Chúng ta của tương lai",
      href: "#",
      imageSrc:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvariety.com%2Fwp-content%2Fuploads%2F2022%2F08%2FScreen-Shot-2022-08-31-at-9.53.54-PM.png%3Fw%3D1024&f=1&nofb=1&ipt=eebdbd7c2cf5fb360a0552788590e9061419d08c2b7167f55ecb6c51df1292d7&ipo=images",
    },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <div
        className="m-2 mb-8 ml-4 bg-zinc-800 h-[80%] "
        style={{ borderRadius: "10px", position: "relative" }}
      >
        <NavBar />

        {/* Line */}
        <div className="my-[14px] mx-3 bg-gray-600 h-[1px]" />

        {/* Page Content */}
        <div style={{ overflow: "hidden", position: "relative" }}>
          {/* Album cover */}
          <div
            className="sticky top-0 flex flex-row justify-center w-full h-44 bg-gray-200"
            style={{ borderRadius: "10px" }}
          >
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvariety.com%2Fwp-content%2Fuploads%2F2022%2F08%2FScreen-Shot-2022-08-31-at-9.53.54-PM.png%3Fw%3D1024&f=1&nofb=1&ipt=eebdbd7c2cf5fb360a0552788590e9061419d08c2b7167f55ecb6c51df1292d7&ipo=images"
              alt="none"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Title */}
          <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
            <h2 style={{ color: "white" }} className="text-2xl my-4 font-bold">
              #Title
            </h2>
            <h2 className="text-md text-white my-4 font-semibold">Playlist</h2>
          </div>

          {/* Songs List */}
          <div
            className="overflow-y-auto mx-auto max-w-2xl lg:max-w-7xl lg:px-8 grid grid-cols-1 gap-x-4"
            style={{
              maxHeight: "240px",
            }}
          >
            {songs.map((song) => (
              <div
                key={song.id}
                className="flex flex-row justify-between items-center"
              >
                <div className="flex flex-row items-center space-x-4">
                  <div className="text-white text-lg font-bold">{song.id}</div>
                  <img
                    src={song.imageSrc}
                    alt="none"
                    className="h-16 w-16 object-cover object-center rounded-lg"
                  />
                  <div className="flex flex-row items-center">
                    <div className="flex flex-col ml-4">
                      <div className="text-white font-bold">{song.name}</div>
                      <div className="text-white text-sm">Artist</div>
                    </div>
                  </div>
                </div>

                <div className="text-white text-sm ml-4">{song.name}</div>
                <div className="text-white text-sm ml-4">3:00</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Music player */}
      <div
        className="mx-2 mt-[-25px] ml-4 bg-zinc-800 h-[17%] "
        style={{ borderRadius: "10px", position: "relative" }}
      >
        <MusicPlayer />
      </div>
    </>
  );
}
