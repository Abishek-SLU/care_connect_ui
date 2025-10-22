import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOneFooterComponent } from './home-one-footer.component';

describe('HomeOneFooterComponent', () => {
  let component: HomeOneFooterComponent;
  let fixture: ComponentFixture<HomeOneFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeOneFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOneFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
