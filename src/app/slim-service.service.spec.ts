import { TestBed } from '@angular/core/testing';

import { SlimServiceService } from './slim-service.service';

describe('SlimServiceService', () => {
  let service: SlimServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlimServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
