export interface SongProps {
  _id: number;
  title: string;
  artist: string;
  source: string;
  poster: string;
}

export interface AlbumProps {
  id: number;
  name: string;
  artist: string;
  listSongs: SongProps[];
}
