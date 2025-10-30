import { TestBed } from '@angular/core/testing';

import { AddBillingService } from './add-billing.service';

describe('AddBillingService', () => {
  let service: AddBillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
