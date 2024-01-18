import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsPanelComponent } from './account-details-panel.component';

describe('AccountDetailsPanelComponent', () => {
  let component: AccountDetailsPanelComponent;
  let fixture: ComponentFixture<AccountDetailsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDetailsPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountDetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
