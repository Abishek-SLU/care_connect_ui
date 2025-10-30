import { TestBed } from '@angular/core/testing';

import { SearchDoctorService } from './search-doctor.service';

describe('SearchDoctorService', () => {
  let service: SearchDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
