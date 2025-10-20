import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInputAutoCompleteComponent } from './header-input-auto-complete.component';

describe('HeaderInputAutoCompleteComponent', () => {
  let component: HeaderInputAutoCompleteComponent;
  let fixture: ComponentFixture<HeaderInputAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderInputAutoCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderInputAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
