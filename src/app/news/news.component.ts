import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GPlusService } from '../services/gplus.service';

@Component({
  selector: 'gdg-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public news: Observable<any[]>;

  constructor(private _gPlus: GPlusService) { }

  ngOnInit() {
    this.news = this._gPlus.news;
  }

  public title(title: string): string {
    switch (title) {
      case 'Google+':
        return 'Post';
      case 'Events':
        return 'Event Announcement';
      default:
        return title;
    }
  }
}
