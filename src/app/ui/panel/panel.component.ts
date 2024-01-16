import { Component } from '@angular/core';
import { SongService } from '../../services/song/song.service';
import { ArtistService } from '../../services/artist/artist.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  constructor(
    private songService: SongService,
    private artistService: ArtistService
  ) {}

  ngOnInit() {
    this.artistService.getArtists({}).subscribe((paginatedSongs) => {
      console.log(paginatedSongs.content);
    });
  }
}
