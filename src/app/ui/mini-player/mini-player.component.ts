import { Component, effect, inject } from '@angular/core';
import { Song } from '../../services/models/song';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-mini-player',
  standalone: true,
  imports: [],
  templateUrl: './mini-player.component.html',
  styleUrl: './mini-player.component.scss',
  host: {
    class: 'absolute bottom-0 right-0',
  },
})
export class MiniPlayerComponent {
  playerService: PlayerService = inject(PlayerService);
  currentPlaylist: Song[] = [];

  constructor() {
    effect(() => {
      this.currentPlaylist = this.playerService.currentPlaylist();
    });
  }

  toggleSongPlaying() {
    if (this.playerService.audioPlayer.paused) {
      this.playerService.playSong();
    } else {
      this.playerService.pauseSong();
    }
  }

  previousSong() {
    this.playerService.playPreviousSong();
  }

  nextSong() {
    this.playerService.playNextSong();
  }

  setAndplaySong(song: Song) {
    this.playerService.addAndPlaySong(song);
  }
}
