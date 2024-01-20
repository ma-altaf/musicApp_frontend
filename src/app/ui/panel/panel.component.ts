import { Component, effect, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AccountPanelComponent } from '../account-panel/account-panel.component';
import { AccountDetailsPanelComponent } from '../account-details-panel/account-details-panel.component';
import { Artist } from '../../services/models/artist';
import { PlaylistPanelComponent } from '../playlist-panel/playlist-panel.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    AccountPanelComponent,
    PlaylistPanelComponent,
    AccountDetailsPanelComponent,
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {
  private auth: AuthenticationService = inject(AuthenticationService);
  user: Artist | null = null;

  constructor() {
    // let the ui know if the user have sign in/ have a token
    effect(() => {
      if (this.auth.tokenAvailable()) {
        this.auth.getCurrentUser().subscribe((artist) => (this.user = artist));
      }
    });
  }
}
