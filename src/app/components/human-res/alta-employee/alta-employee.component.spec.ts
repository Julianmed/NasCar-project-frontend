import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEmployeeComponent } from './alta-employee.component';

describe('AltaEmployeeComponent', () => {
  let component: AltaEmployeeComponent;
  let fixture: ComponentFixture<AltaEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
