import {
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { Song } from '../../services/models/song';
import { PlayerService } from '../../services/player/player.service';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { NgOptimizedImage } from '@angular/common';
import { SongService } from '../../services/song/song.service';

@Component({
  selector: 'app-mini-player',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './mini-player.component.html',
  styleUrl: './mini-player.component.scss',
  host: {
    class: 'absolute bottom-0 right-0',
  },
})
export class MiniPlayerComponent {
  playerService: PlayerService = inject(PlayerService);
  playlistService: PlaylistService = inject(PlaylistService);
  songService: SongService = inject(SongService);
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

  incrementFavourite() {
    // get the song to favourite
    const song: Song | null = this.playerService.currentSong();
    if (song !== null) {
      this.songService.incrementFavourite(song.id).subscribe();
    }
  }
}
