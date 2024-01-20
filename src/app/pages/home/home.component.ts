import { Component, NgModule, inject } from '@angular/core';
import { SongService } from '../../services/song/song.service';
import { Song } from '../../services/models/song';
import { PaginationResponse } from '../../services/models/pagination-response';
import { SongTileComponent } from '../../ui/song-tile/song-tile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SongTileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {
    class: 'flex w-4/5 h-full',
  },
})
export class HomeComponent {
  private songService: SongService = inject(SongService);
  songs: Song[] | null = null;
  songsPaginationInfo: PaginationResponse<Song> | null = null;

  constructor() {
    this.songService.getSongs({}).subscribe((res) => {
      this.songs = res.content;
      this.songsPaginationInfo = res;
    });
  }

  loadMore() {
    const pageNo = this.songsPaginationInfo!.number + 1;
    this.songService.getSongs({ pageNo }).subscribe((res) => {
      this.songs = this.songs!.concat(res.content);
      this.songsPaginationInfo = res;
    });
  }
}
