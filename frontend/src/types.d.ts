declare interface PlaylistData {
  _id: string;
  name: string;
  user_id: string;
  songs: number[];
}
declare interface SongData {
  _id: number;
  title: string;
  poster: string;
  artist: string;
  source: string;
  tags?: string[];
}
