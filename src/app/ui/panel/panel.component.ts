import { Component } from '@angular/core';
import { SongService } from '../../services/song/song.service';
import { ArtistService } from '../../services/artist/artist.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

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
    private artistService: ArtistService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    //Testing update password, authorization cookies not being sent
    this.auth.register('user', 'pass').subscribe((authU) => {
      console.log(authU);
      sessionStorage.setItem('token', authU.token);
      this.auth.updatePassword('pass', 'newPass').subscribe((artist) => {
        console.log(artist);
      });
    });
  }
}
