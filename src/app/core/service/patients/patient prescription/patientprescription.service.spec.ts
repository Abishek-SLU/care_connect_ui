import { TestBed } from '@angular/core/testing';

import { PatientprescriptionService } from './patientprescription.service';

describe('PatientprescriptionService', () => {
  let service: PatientprescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientprescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
