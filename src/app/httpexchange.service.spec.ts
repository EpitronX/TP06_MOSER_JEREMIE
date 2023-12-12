import { TestBed } from '@angular/core/testing';

import { HTTPExchangeService } from './httpexchange.service';

describe('HTTPExchangeService', () => {
  let service: HTTPExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HTTPExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
