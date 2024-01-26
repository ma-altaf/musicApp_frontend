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
import { PlaylistService } from '../../services/playlist/playlist.service';

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
  playlistService: PlaylistService = inject(PlaylistService);
  currentPlaylist: Song[] = [];
  @ViewChild('playlistQueue') playlistElement!: ElementRef<HTMLElement>;
  currentSongIndex: number = 0;

  constructor() {
    effect(() => {
      this.currentPlaylist = this.playerService.currentPlaylist();

      if (this.playerService.currentSong()?.id) {
        this.currentSongIndex = this.currentPlaylist
          .map((el) => el.id)
          .indexOf(this.playerService.currentSong()!.id);
      }
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

  setAndplaySong(event: Event, song: Song) {
    event.stopPropagation();
    this.playerService.addAndPlaySong(song);
  }

  removeSong(event: Event, song: Song) {
    event.stopPropagation();
    this.playerService.removeSongFromPlaylist(song);
  }

  addSongToPlaylist(event: Event, song: Song) {
    event.stopPropagation();
    this.playlistService.openPlaylistPopup(song);
  }

  togglePlaylistVisibility() {
    this.playlistElement.nativeElement.classList.toggle('hidden');
  }
}
