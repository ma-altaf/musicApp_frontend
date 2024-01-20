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

  addToPlayer(song: Song) {
    this.playerService.addSong(song);
  }

  playSong(song: Song) {
    this.playerService.playSong(song);
  }
}
