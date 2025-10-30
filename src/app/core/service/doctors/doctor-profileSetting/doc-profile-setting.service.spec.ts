import { TestBed } from '@angular/core/testing';

import { DocProfileSettingService } from './doc-profile-setting.service';

describe('DocProfileSettingService', () => {
  let service: DocProfileSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocProfileSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
