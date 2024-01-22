import { Injectable, WritableSignal, signal } from '@angular/core';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  currentPlaylist: WritableSignal<Song[]> = signal([]);
  currentSong: WritableSignal<Song | null> = signal(null);
  audioPlayer: HTMLAudioElement = new Audio();

  constructor() {
    this.audioPlayer.onended = () => {
      this.playNextSong();
    };
  }

  AddSongToPlaylist(song: Song) {
    this.currentPlaylist.update((prev) => {
      if (prev.map((el) => el.id).includes(song.id)) {
        this.setCurrentSong(song);
        this.playSong();
        return prev;
      }

      if (prev.length === 0) {
        this.setCurrentSong(song);
      }

      return prev.concat(song);
    });
  }

  removeSongFromPlaylist(index: number) {
    this.currentPlaylist.update((prev) => prev.slice(index, 1));
  }

  setCurrentSong(song: Song) {
    this.currentSong.set(song);
    this.audioPlayer.src = song.audioUrl;
  }

  playSong() {
    this.audioPlayer.play();
  }

  addAndPlaySong(song: Song) {
    this.AddSongToPlaylist(song);
    this.setCurrentSong(song);
    this.playSong();
  }

  pauseSong() {
    this.audioPlayer.pause();
  }

  playPreviousSong() {
    // determine next song
    let currentSongIndex = this.currentPlaylist()
      .map((el) => el.id)
      .indexOf(this.currentSong()!.id);

    // previous index
    let previousSongIndex =
      currentSongIndex > 0
        ? currentSongIndex - 1
        : this.currentPlaylist().length - 1;

    this.setCurrentSong(this.currentPlaylist()[previousSongIndex]);
    this.playSong();
  }

  playNextSong() {
    // determine next song
    let currentSongIndex = this.currentPlaylist()
      .map((el) => el.id)
      .indexOf(this.currentSong()!.id);

    // next song index
    let nextSongIndex = (currentSongIndex + 1) % this.currentPlaylist().length;

    this.setCurrentSong(this.currentPlaylist()[nextSongIndex]);
    console.log(this.currentSong());

    this.playSong();
  }
}
