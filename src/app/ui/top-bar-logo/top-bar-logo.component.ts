import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-bar-logo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-bar-logo.component.html',
  styleUrl: './top-bar-logo.component.scss',
  host: {
    class: 'w-1/5 h-full',
  },
})
export class TopBarLogoComponent {}
