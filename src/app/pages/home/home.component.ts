import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {
    class: 'flex w-4/5 h-full',
  },
})
export class HomeComponent {}
