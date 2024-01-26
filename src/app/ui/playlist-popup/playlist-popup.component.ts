import { Component, effect, inject } from '@angular/core';
import { Playlist } from '../../services/models/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-playlist-popup',
  standalone: true,
  imports: [],
  templateUrl: './playlist-popup.component.html',
  styleUrl: './playlist-popup.component.scss',
})
export class PlaylistPopupComponent {
  playlistService: PlaylistService = inject(PlaylistService);
  private auth: AuthenticationService = inject(AuthenticationService);
  playlists: Playlist[] | null = null;
  newPlaylistTitle = '';

  constructor() {
    effect(() => {
      if (this.auth.tokenAvailable()) {
        this.playlistService
          .getUserPlaylists()
          .subscribe((res) => (this.playlists = res));
      }
    });
  }

  addSongToPlaylist(playlist: Playlist) {
    this.playlistService.addSongToPlaylist(playlist.id).subscribe((res) => {
      this.playlistService.playlistPopupSong.set(null);
    });
  }

  onTitleKeyPress(event: any) {
    this.newPlaylistTitle = event.target.value;
  }

  addPlaylist() {
    if (this.newPlaylistTitle) {
      this.playlistService
        .addPlaylist(this.newPlaylistTitle)
        .subscribe((res) => {
          this.playlists = this.playlists!.concat(res);
          this.newPlaylistTitle = '';
        });
    }
  }

  leavePlaylistPopup(event: Event) {
    event.stopPropagation();
    this.playlistService.playlistPopupSong.set(null);
  }
}
