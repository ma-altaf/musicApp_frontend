import { Component, Input } from '@angular/core';
import { Artist } from '../../services/models/artist';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [],
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.scss',
  host: {
    class: 'w-full h-full',
  },
})
export class ProfilePictureComponent {
  @Input() user: Artist | null = null;
}
