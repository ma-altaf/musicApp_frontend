import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChannelComponent } from './pages/channel/channel.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { SongFormComponent } from './pages/song-form/song-form.component';
import { SongDetailsComponent } from './pages/song-details/song-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'channel',
    component: ChannelComponent,
  },
  {
    path: 'playlist/:id',
    component: PlaylistComponent,
  },
  {
    path: 'edit/song',
    component: SongFormComponent,
  },
  {
    path: 'song/:id',
    component: SongDetailsComponent,
  },
];
