import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { TopBarLogoComponent } from '../top-bar-logo/top-bar-logo.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [SearchBarComponent, TopBarLogoComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {}
