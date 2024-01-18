import { Component, Input, inject } from '@angular/core';
import { Artist } from '../../services/models/artist';
import { Playlist } from '../../services/models/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-playlist-panel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './playlist-panel.component.html',
  styleUrl: './playlist-panel.component.scss',
})
export class PlaylistPanelComponent {
  @Input() user: Artist | null = null;
  private playlistService: PlaylistService = inject(PlaylistService);
  playlists: Playlist[] | null = null;

  constructor() {
    this.playlistService.getUserPlaylists().subscribe((res) => {
      this.playlists = res;
      console.log(this.playlists);
    });
  }

  addPlaylist() {}
}
