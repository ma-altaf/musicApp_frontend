import { Component } from '@angular/core';

@Component({
  selector: 'app-top-bar-logo',
  standalone: true,
  imports: [],
  templateUrl: './top-bar-logo.component.html',
  styleUrl: './top-bar-logo.component.scss',
  host: {
    class: 'w-1/5 h-full',
  },
})
export class TopBarLogoComponent {}
