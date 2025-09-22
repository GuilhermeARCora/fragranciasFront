import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAndEditProductComponent } from './create-and-edit-product.component';

describe('CreateAndEditProductComponent', () => {
  let component: CreateAndEditProductComponent;
  let fixture: ComponentFixture<CreateAndEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAndEditProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAndEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
