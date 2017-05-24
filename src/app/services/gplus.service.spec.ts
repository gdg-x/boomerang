import { TestBed, inject } from '@angular/core/testing';

import { GPlusService } from './gplus.service';

describe('GPlusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GPlusService]
    });
  });

  it('should ...', inject([GPlusService], (service: GPlusService) => {
    expect(service).toBeTruthy();
  }));
});
