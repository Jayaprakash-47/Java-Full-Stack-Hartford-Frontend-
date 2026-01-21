import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInsurance } from './create-insurance';

describe('CreateInsurance', () => {
  let component: CreateInsurance;
  let fixture: ComponentFixture<CreateInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInsurance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
