import { Artist } from './artist';

export interface Song {
  id: string;
  title: string;
  imgUrl: string;
  audioUrl: string;
  favourites: number; // how many users have liked the song
  downloads: number; // how many times the song have been downloaded
  listens: number; // how many times the song has been played
  released: number;
  sources: Song[];
  author: Artist;
}
