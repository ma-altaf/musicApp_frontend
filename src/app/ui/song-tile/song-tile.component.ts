import { Component, Input, inject } from '@angular/core';
import { Song } from '../../services/models/song';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-song-tile',
  standalone: true,
  imports: [],
  templateUrl: './song-tile.component.html',
  styleUrl: './song-tile.component.scss',
})
export class SongTileComponent {
  @Input() song!: Song;
  private playerService: PlayerService = inject(PlayerService);

  addAndPlaySong(song: Song) {
    this.playerService.addAndPlaySong(song);
  }

  addToPlayer(event: Event, song: Song) {
    event.stopPropagation();
    this.playerService.AddSongToPlaylist(song);
  }
}
