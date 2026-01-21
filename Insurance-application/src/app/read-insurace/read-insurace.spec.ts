import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadInsurace } from './read-insurace';

describe('ReadInsurace', () => {
  let component: ReadInsurace;
  let fixture: ComponentFixture<ReadInsurace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadInsurace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadInsurace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
