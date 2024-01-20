import {
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { Artist } from '../../services/models/artist';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProfilePictureComponent } from '../../ui/profile-picture/profile-picture.component';
import { Song } from '../../services/models/song';
import { SongService, SongSort } from '../../services/song/song.service';
import { RouterLink } from '@angular/router';
import { ArtistStats } from '../../services/models/artist-stats';
import { SongTileComponent } from '../../ui/song-tile/song-tile.component';
import { DropDownMenuComponent } from '../../ui/drop-down-menu/drop-down-menu.component';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [
    ProfilePictureComponent,
    SongTileComponent,
    DropDownMenuComponent,
    RouterLink,
  ],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss',
  host: {
    class: 'flex w-4/5 h-full',
  },
})
export class ChannelComponent {
  private auth: AuthenticationService = inject(AuthenticationService);
  private songService: SongService = inject(SongService);
  user: Artist | null = null;
  songs: Song[] | null = null;
  artistStats: ArtistStats | null = null;
  @ViewChild('fileupload') fileUploadInput!: ElementRef<HTMLInputElement>;

  sortingOptions: string[] = SongSort;
  orderAscending = true;

  isSignIn: boolean = false;

  constructor() {
    // let the ui know if the user have sign in/ have a token
    effect(() => {
      this.isSignIn = this.auth.tokenAvailable();
      if (this.isSignIn) {
        this.auth.getCurrentUser().subscribe((artist) => {
          this.user = artist;
          this.songService.getSongsByArtist(artist.id).subscribe((songs) => {
            this.songs = songs;
            this.artistStats = this.getArtistStats(songs);
          });
        });
      }
    });

    console.log(this.sortingOptions);
  }

  fileUploadInputClick() {
    this.fileUploadInput.nativeElement.click();
  }

  uploadProfileImg() {
    let formData = new FormData();
    let filelist: FileList | null = this.fileUploadInput.nativeElement?.files;
    if (filelist) {
      formData.append('imgFile', filelist[0]);
      this.auth.updateImg(formData).subscribe((res) => {
        this.user = res;
      });
    }
  }

  getArtistStats(songs: Song[]): ArtistStats {
    return songs.reduce((res, song) => {
      res.downloads += song.downloads;
      res.favourites += song.favourites;
      res.listens += song.listens;

      return res;
    });
  }

  changeSortField(event: number) {
    if (this.songs != null) {
      this.songs = this.songService.sortSongs(this.songs, event);
    }
  }
}
