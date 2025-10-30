import { TestBed } from '@angular/core/testing';

import { DocAppointmentsService } from './doc-appointments.service';

describe('DocAppointmentsService', () => {
  let service: DocAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
