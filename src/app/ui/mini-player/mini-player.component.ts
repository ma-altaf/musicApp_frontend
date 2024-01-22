import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  effect,
  inject,
} from '@angular/core';
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
  @ViewChild('playlistQueue') playlistElement!: ElementRef<HTMLElement>;
  currentSongIndex: number = 0;

  constructor() {
    effect(() => {
      this.currentPlaylist = this.playerService.currentPlaylist();

      this.currentSongIndex = this.currentPlaylist
        .map((el) => el.id)
        .indexOf(this.playerService.currentSong()!.id);
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

  togglePlaylistVisibility() {
    this.playlistElement.nativeElement.classList.toggle('hidden');
  }
}
