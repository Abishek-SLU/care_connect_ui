import { TestBed } from '@angular/core/testing';

import { DocScheduleTimingService } from './doc-schedule-timing.service';

describe('DocScheduleTimingService', () => {
  let service: DocScheduleTimingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocScheduleTimingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
