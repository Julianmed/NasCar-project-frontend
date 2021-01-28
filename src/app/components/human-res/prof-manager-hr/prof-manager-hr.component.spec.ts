import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfManagerHrComponent } from './prof-manager-hr.component';

describe('ProfManagerHrComponent', () => {
  let component: ProfManagerHrComponent;
  let fixture: ComponentFixture<ProfManagerHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfManagerHrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfManagerHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
