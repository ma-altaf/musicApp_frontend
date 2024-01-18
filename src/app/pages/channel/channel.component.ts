import { Component } from '@angular/core';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss',
  host: {
    class: 'flex w-4/5 h-full',
  },
})
export class ChannelComponent {}
