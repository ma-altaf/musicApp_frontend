import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PanelComponent } from './ui/panel/panel.component';
import { MiniPlayerComponent } from './ui/mini-player/mini-player.component';
import { PlaylistPopupComponent } from './ui/playlist-popup/playlist-popup.component';
import { TopBarComponent } from './ui/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    PanelComponent,
    MiniPlayerComponent,
    PlaylistPopupComponent,
    TopBarComponent,
  ],
})
export class AppComponent {
  title = 'musicApp';
}
