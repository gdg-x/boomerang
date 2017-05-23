import { TestBed, inject } from '@angular/core/testing';

import { MeetupService } from './meetup.service';

describe('EventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetupService]
    });
  });

  it('should ...', inject([MeetupService], (service: MeetupService) => {
    expect(service).toBeTruthy();
  }));
});
