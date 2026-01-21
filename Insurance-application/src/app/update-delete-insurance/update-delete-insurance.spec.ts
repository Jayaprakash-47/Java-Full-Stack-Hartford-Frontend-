import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeleteInsurance } from './update-delete-insurance';

describe('UpdateDeleteInsurance', () => {
  let component: UpdateDeleteInsurance;
  let fixture: ComponentFixture<UpdateDeleteInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDeleteInsurance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDeleteInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
