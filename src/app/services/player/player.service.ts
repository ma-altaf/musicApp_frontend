import { Injectable, WritableSignal, signal } from '@angular/core';
import { Song } from '../models/song';
import { Playlist } from '../models/playlist';

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

  setCurrentPlaylist(playlist: Playlist) {
    this.currentPlaylist.set(
      playlist.songs
        .sort((a, b) => a.position - b.position)
        .map((el) => el.song)
    );
    this.addAndPlaySong(this.currentPlaylist()[0]);
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

  removeSongFromPlaylist(song: Song) {
    if (song.id === this.currentSong()?.id) {
      // since current song will be removed select the next song
      this.nextSong();

      if (!this.audioPlayer.paused) {
        this.playSong();
      }
    }

    this.currentPlaylist.update((prev) => {
      const index = prev.map((el) => el.id).indexOf(song.id);

      prev.splice(index, 1);

      if (prev.length === 0) {
        this.audioPlayer.pause();
        this.currentSong.set(null);
      }

      return prev;
    });
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

  previousSong() {
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
  }

  playPreviousSong() {
    this.previousSong();
    this.playSong();
  }

  nextSong() {
    // determine next song
    let currentSongIndex = this.currentPlaylist()
      .map((el) => el.id)
      .indexOf(this.currentSong()!.id);

    // next song index
    let nextSongIndex = (currentSongIndex + 1) % this.currentPlaylist().length;

    this.setCurrentSong(this.currentPlaylist()[nextSongIndex]);
  }

  playNextSong() {
    this.nextSong();
    this.playSong();
  }
}
