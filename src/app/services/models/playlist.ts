import { PlaylistSong } from './playlist-song';

export interface Playlist {
  id: number;
  title: string;
  songs: PlaylistSong[];
}
