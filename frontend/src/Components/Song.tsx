import { PlayCircleIcon } from "@heroicons/react/16/solid";

interface SongProps {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
}

export default function Song({ data }: { data: SongProps }) {
  return (
    <a key={data.id} href={data.href} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={data.imageSrc}
          alt="none"
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <PlayCircleIcon className="w-16" />
        </div>
      </div>
      <h3 className="mt-4 ml-12 text-md text-white">{data.name}</h3>
    </a>
  );
}
