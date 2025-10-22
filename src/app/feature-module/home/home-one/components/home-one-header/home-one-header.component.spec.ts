import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOneHeaderComponent } from './home-one-header.component';

describe('HomeOneHeaderComponent', () => {
  let component: HomeOneHeaderComponent;
  let fixture: ComponentFixture<HomeOneHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeOneHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOneHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
