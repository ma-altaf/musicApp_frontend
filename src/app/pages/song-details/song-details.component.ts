import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../services/song/song.service';
import { Song } from '../../services/models/song';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ArtistService } from '../../services/artist/artist.service';
import { Artist } from '../../services/models/artist';
import { SongTileComponent } from '../../ui/song-tile/song-tile.component';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-song-details',
  standalone: true,
  imports: [DatePipe, SongTileComponent, NgOptimizedImage],
  templateUrl: './song-details.component.html',
  styleUrl: './song-details.component.scss',
  host: {
    class: 'flex w-4/5 h-full',
  },
})
export class SongDetailsComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private songService: SongService = inject(SongService);
  private artistService: ArtistService = inject(ArtistService);
  private playerService: PlayerService = inject(PlayerService);

  song: Song | null = null;
  artist: Artist | null = null;

  constructor() {
    this.activatedRoute.params.subscribe((res) => {
      this.songService.getSongById(res['id']).subscribe((res) => {
        this.song = res;
        this.artistService
          .getArtistById(this.song.author.id)
          .subscribe((res) => {
            this.artist = res;
          });
      });
    });
  }

  addAndPlay() {
    if (this.song) {
      this.playerService.addAndPlaySong(this.song);
    }
  }
}
