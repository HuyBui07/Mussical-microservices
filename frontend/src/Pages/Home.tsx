import NavBar from "../Components/NavBar";

export default function Home() {
  const songs = [
    {
      id: 1,
      name: 'Chúng ta của tương lai',
      href: '#',
      imageSrc: 'https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-6/428615067_964463951702665_2285924899731173475_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bwy0Z-sGTO0AX8o1ofN&_nc_ht=scontent.fsgn6-1.fna&oh=00_AfBj_Mv1-Cfi6DUKjTRt9bY5JpYiXUy5qW8yxwVTi7r-SQ&oe=660429EC',
    },
    {
      id: 2,
      name: 'Chúng ta của tương lai',
      href: '#',
      imageSrc: 'https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-6/428615067_964463951702665_2285924899731173475_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bwy0Z-sGTO0AX8o1ofN&_nc_ht=scontent.fsgn6-1.fna&oh=00_AfBj_Mv1-Cfi6DUKjTRt9bY5JpYiXUy5qW8yxwVTi7r-SQ&oe=660429EC',
    },
    {
      id: 3,
      name: 'Chúng ta của tương lai',
      href: '#',
      imageSrc: 'https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-6/428615067_964463951702665_2285924899731173475_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bwy0Z-sGTO0AX8o1ofN&_nc_ht=scontent.fsgn6-1.fna&oh=00_AfBj_Mv1-Cfi6DUKjTRt9bY5JpYiXUy5qW8yxwVTi7r-SQ&oe=660429EC',
    },
    {
      id: 4,
      name: 'Chúng ta của tương lai',
      href: '#',
      imageSrc: 'https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-6/428615067_964463951702665_2285924899731173475_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=bwy0Z-sGTO0AX8o1ofN&_nc_ht=scontent.fsgn6-1.fna&oh=00_AfBj_Mv1-Cfi6DUKjTRt9bY5JpYiXUy5qW8yxwVTi7r-SQ&oe=660429EC',
    },
    // More products...
  ]
  
    return (
      <>
      <div className="m-2 mb-8 lg:ml-[315px] bg-zinc-800 h-[80%] " style={{ borderRadius: '10px' }}>
          <NavBar/>
          <div className="my-[14px] mx-3 bg-gray-600 h-[1px]" />
          
         <div >
         <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <h2 className="text-md text-white my-4">Recent Songs</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {songs.map((song) => (
            <a key={song.id} href={song.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={song.imageSrc}
                  alt="none"
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 ml-12 text-md text-white">{song.name}</h3>
            </a>
          ))}
        </div>
      </div>
         </div>
      </div>
      <div className="mx-2 mt-[-25px] lg:ml-[315px] bg-zinc-800 h-[17%] " style={{ borderRadius: '10px' }}>
          
      </div>
      </>
      
    );
  }
  