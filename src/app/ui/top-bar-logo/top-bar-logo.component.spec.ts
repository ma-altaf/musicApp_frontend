import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarLogoComponent } from './top-bar-logo.component';

describe('TopBarLogoComponent', () => {
  let component: TopBarLogoComponent;
  let fixture: ComponentFixture<TopBarLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopBarLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
