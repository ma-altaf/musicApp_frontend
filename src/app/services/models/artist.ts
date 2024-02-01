import { Song } from './song';

export interface Artist {
  id: number;
  username: string;
  imgUrl: string;
  songs: Song[];
}
