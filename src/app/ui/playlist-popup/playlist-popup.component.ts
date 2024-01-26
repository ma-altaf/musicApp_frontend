import { Component, inject } from '@angular/core';
import { Playlist } from '../../services/models/playlist';
import { PlaylistService } from '../../services/playlist/playlist.service';

@Component({
  selector: 'app-playlist-popup',
  standalone: true,
  imports: [],
  templateUrl: './playlist-popup.component.html',
  styleUrl: './playlist-popup.component.scss',
})
export class PlaylistPopupComponent {
  playlistService: PlaylistService = inject(PlaylistService);
  playlists: Playlist[] | null = null;
  newPlaylistTitle = '';

  constructor() {
    this.playlistService
      .getUserPlaylists()
      .subscribe((res) => (this.playlists = res));
  }

  addSongToPlaylist(playlist: Playlist) {
    this.playlistService.addSongToPlaylist(playlist.id).subscribe((res) => {
      console.log(res);
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
