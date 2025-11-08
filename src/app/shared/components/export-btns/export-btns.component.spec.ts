import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBtnsComponent } from './export-btns.component';

describe('ExportBtnsComponent', () => {
  let component: ExportBtnsComponent;
  let fixture: ComponentFixture<ExportBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportBtnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
