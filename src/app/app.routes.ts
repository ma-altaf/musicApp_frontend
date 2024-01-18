import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChannelComponent } from './pages/channel/channel.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';

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
];
