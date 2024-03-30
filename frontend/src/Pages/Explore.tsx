import MusicPlayer from "../Components/MusicPlayer";
import NavBar from "../Components/NavBar";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PlayCircleIcon,
} from "@heroicons/react/16/solid";
export default function Explore() {
  const songs = [
    {
      id: 1,
      name: "Chúng ta của tương lai",
      href: "#",
      imageSrc:
        "https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-6/428615067_964463951702665_2285924899731173475_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bwy0Z-sGTO0AX8o1ofN&_nc_ht=scontent.fsgn6-1.fna&oh=00_AfBj_Mv1-Cfi6DUKjTRt9bY5JpYiXUy5qW8yxwVTi7r-SQ&oe=660429EC",
    },
    {
      id: 2,
      name: "Chúng ta của tương lai",
      href: "#",
      imageSrc:
        "https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-6/428615067_964463951702665_2285924899731173475_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bwy0Z-sGTO0AX8o1ofN&_nc_ht=scontent.fsgn6-1.fna&oh=00_AfBj_Mv1-Cfi6DUKjTRt9bY5JpYiXUy5qW8yxwVTi7r-SQ&oe=660429EC",
    },
    {
      id: 3,
      name: "Chúng ta của tương lai",
      href: "#",
      imageSrc:
        "https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-6/428615067_964463951702665_2285924899731173475_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bwy0Z-sGTO0AX8o1ofN&_nc_ht=scontent.fsgn6-1.fna&oh=00_AfBj_Mv1-Cfi6DUKjTRt9bY5JpYiXUy5qW8yxwVTi7r-SQ&oe=660429EC",
    },
    {
      id: 4,
      name: "Chúng ta của tương lai",
      href: "#",
      imageSrc:
        "https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-6/428615067_964463951702665_2285924899731173475_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bwy0Z-sGTO0AX8o1ofN&_nc_ht=scontent.fsgn6-1.fna&oh=00_AfBj_Mv1-Cfi6DUKjTRt9bY5JpYiXUy5qW8yxwVTi7r-SQ&oe=660429EC",
    },
    // More products...
  ];

  return (
    <>
      {/* Navigation Bar */}
      <div
        className="m-2 mb-8 ml-4 bg-zinc-800 h-[80%] "
        style={{ borderRadius: "10px" }}
      >
        <NavBar />

        {/* Line */}
        <div className="my-[14px] mx-3 bg-gray-600 h-[1px]" />

        {/* Page Content */}
        <div style={{ overflow: "auto", maxHeight: "500px" }}>
          <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
            <div className="flex flex-row justify-between">
              <h2 className="text-md text-white my-4">Recent Songs</h2>
              <div className="flex flex-row">
                <ChevronLeftIcon className="w-6" />
                <ChevronRightIcon className="w-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {songs.map((song) => (
                <a key={song.id} href={song.href} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={song.imageSrc}
                      alt="none"
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <PlayCircleIcon className="w-16" />
                    </div>
                  </div>
                  <h3 className="mt-4 ml-12 text-md text-white">{song.name}</h3>
                </a>
              ))}
            </div>
          </div>
          <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
            <div className="flex flex-row justify-between">
              <h2 className="text-md text-white my-4">Recommended</h2>
              <div className="flex flex-row">
                <ChevronLeftIcon className="w-6" />
                <ChevronRightIcon className="w-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {songs.map((song) => (
                <a key={song.id} href={song.href} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={song.imageSrc}
                      alt="none"
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <PlayCircleIcon className="w-16" />
                    </div>
                  </div>
                  <h3 className="mt-4 ml-12 text-md text-white">{song.name}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Music player */}
      <div
        className="mx-2 mt-[-25px] ml-4 bg-zinc-800 h-[17%] "
        style={{ borderRadius: "10px" }}
      >
        <MusicPlayer />
      </div>
    </>
  );
}
