import { Component, Input } from '@angular/core';
import { Song } from '../../services/models/song';

@Component({
  selector: 'app-song-tile',
  standalone: true,
  imports: [],
  templateUrl: './song-tile.component.html',
  styleUrl: './song-tile.component.scss',
})
export class SongTileComponent {
  @Input() song!: Song;
}
