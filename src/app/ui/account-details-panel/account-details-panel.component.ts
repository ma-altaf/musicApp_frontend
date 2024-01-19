import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { Artist } from '../../services/models/artist';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

@Component({
  selector: 'app-account-details-panel',
  standalone: true,
  imports: [RouterLink, ProfilePictureComponent],
  templateUrl: './account-details-panel.component.html',
  styleUrl: './account-details-panel.component.scss',
})
export class AccountDetailsPanelComponent {
  @Input() user: Artist | null = null;
}
