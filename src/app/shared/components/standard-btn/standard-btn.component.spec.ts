import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardBtnComponent } from './standard-btn.component';

describe('StandardBtnComponent', () => {
  let component: StandardBtnComponent;
  let fixture: ComponentFixture<StandardBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
