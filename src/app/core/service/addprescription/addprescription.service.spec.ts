import { TestBed } from '@angular/core/testing';

import { AddprescriptionService } from './addprescription.service';

describe('AddprescriptionService', () => {
  let service: AddprescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddprescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
