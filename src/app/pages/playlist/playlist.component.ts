import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '../../services/models/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { SongTileComponent } from '../../ui/song-tile/song-tile.component';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [SongTileComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
  host: {
    class: 'flex w-4/5 h-full',
  },
})
export class PlaylistComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private playlistService: PlaylistService = inject(PlaylistService);
  private playerService: PlayerService = inject(PlayerService);

  playlist: Playlist | null = null;

  constructor() {
    this.activatedRoute.params.subscribe((val) => {
      this.playlistService.getPlaylistById(val['id']).subscribe((res) => {
        this.playlist = res;
      });
    });
  }

  setPlaylist() {
    if (this.playlist != null) {
      this.playerService.setCurrentPlaylist(this.playlist);
    }
  }
}
