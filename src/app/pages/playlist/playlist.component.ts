import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '../../services/models/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
  host: {
    class: 'flex w-4/5 h-full',
  },
})
export class PlaylistComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private playlistService: PlaylistService = inject(PlaylistService);

  playlist: Playlist | null = null;

  constructor() {
    this.activatedRoute.params.subscribe((val) => {
      this.playlistService.getPlaylistById(val['id']).subscribe((res) => {
        this.playlist = res;
      });
    });
  }
}
