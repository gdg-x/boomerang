import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MeetupService } from '../services/meetup.service';

@Component({
  selector: 'gdg-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  public photos: Observable<any[]>;
  constructor(private _meetup: MeetupService) { }

  ngOnInit() {
    this.photos = this._meetup.photos;
  }

  public goToURL(url: string): void {
    window.open(url, '_blank');
  }
}
