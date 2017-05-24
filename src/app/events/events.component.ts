import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MeetupService } from '../services/meetup.service';

@Component({
  selector: 'gdg-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public past: Observable<any[]>;
  public upcoming: Observable<any[]>;
  constructor(private _meetup: MeetupService) { }

  ngOnInit() {
    this.upcoming = this._meetup.upcoming;
    this.past = this._meetup.past;
  }

  public address(venue: any): string {
    let location: string[] = [];
    if (venue.name) { location.push(venue.name); }
    if (venue.address_1) { location.push(venue.address_1); }
    if (venue.city) { location.push(venue.city); }
    if (venue.state) { location.push(venue.state); }
    if (venue.localized_country_name) { location.push(venue.localized_country_name); }
    return location.join(', ');
  }

  public gmapsURL(venue: any): string {
    let location: string[] = [];
    if (venue.name) { location.push(venue.name); }
    if (venue.address_1) { location.push(venue.address_1); }
    if (venue.city) { location.push(venue.city); }
    if (venue.state) { location.push(venue.state); }
    if (venue.localized_country_name) { location.push(venue.localized_country_name); }
    return 'https://www.google.com/maps/search/' + location.join('+');
  }
}
