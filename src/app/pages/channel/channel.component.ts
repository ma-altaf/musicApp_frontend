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
import { SongService } from '../../services/song/song.service';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [ProfilePictureComponent],
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
  @ViewChild('fileupload') fileUpload!: ElementRef<HTMLInputElement>;

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
          });
        });
      }
    });
  }

  initiateFileUpload() {
    this.fileUpload.nativeElement.click();
  }

  uploadProfileImg() {
    let formData = new FormData();
    let filelist: FileList | null = this.fileUpload.nativeElement?.files;
    if (filelist) {
      formData.append('imgFile', filelist[0]);
      this.auth.updateImg(formData).subscribe((res) => {
        this.user = res;
      });
    }
  }
}
