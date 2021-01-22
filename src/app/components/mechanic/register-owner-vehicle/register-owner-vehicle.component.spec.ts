import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOwnerVehicleComponent } from './register-owner-vehicle.component';

describe('RegisterOwnerVehicleComponent', () => {
  let component: RegisterOwnerVehicleComponent;
  let fixture: ComponentFixture<RegisterOwnerVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterOwnerVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOwnerVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
