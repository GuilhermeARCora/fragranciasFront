import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollTopBtnComponent } from './scroll-top-btn.component';

describe('ScrollTopBtnComponent', () => {
  let component: ScrollTopBtnComponent;
  let fixture: ComponentFixture<ScrollTopBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollTopBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollTopBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
