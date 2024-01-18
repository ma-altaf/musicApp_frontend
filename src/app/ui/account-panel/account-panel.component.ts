import { Component } from '@angular/core';
import { AccountFormComponent } from '../account-form/account-form.component';

@Component({
  selector: 'app-account-panel',
  standalone: true,
  imports: [AccountFormComponent],
  templateUrl: './account-panel.component.html',
  styleUrl: './account-panel.component.scss',
})
export class AccountPanelComponent {
  displayForm: boolean = false;

  toggleDisplayForm() {
    this.displayForm = !this.displayForm;
  }
}
