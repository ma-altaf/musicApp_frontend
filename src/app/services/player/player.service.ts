import { Injectable, WritableSignal, signal } from '@angular/core';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  currentPlaylist: WritableSignal<Song[]> = signal([]);
  currentSong: WritableSignal<Song | null> = signal(null);
  audioPlayer: HTMLAudioElement = new Audio();

  constructor() {}

  addSong(song: Song) {
    this.currentPlaylist.update((prev) => {
      if (prev.map((el) => el.id).includes(song.id)) {
        this.playSong(song);
        return prev;
      }

      return prev.concat(song);
    });
  }

  removeSong(index: number) {
    this.currentPlaylist.update((prev) => prev.slice(index, 1));
  }

  playSong(song: Song) {
    console.log(song);

    this.currentSong.set(song);
    this.audioPlayer.src = song.audioUrl;
    this.audioPlayer.play();
  }
}
