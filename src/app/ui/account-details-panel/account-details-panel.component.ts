import { Component, Input } from '@angular/core';
import { Artist } from '../../services/models/artist';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-details-panel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './account-details-panel.component.html',
  styleUrl: './account-details-panel.component.scss',
})
export class AccountDetailsPanelComponent {
  @Input() user: Artist | null = null;
}
