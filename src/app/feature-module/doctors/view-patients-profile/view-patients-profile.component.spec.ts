import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientsProfileComponent } from './view-patients-profile.component';

describe('ViewPatientsProfileComponent', () => {
  let component: ViewPatientsProfileComponent;
  let fixture: ComponentFixture<ViewPatientsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPatientsProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
