import { Song } from './song';

export interface PlaylistSong {
  id: number;
  song: Song;
  position: number;
}
