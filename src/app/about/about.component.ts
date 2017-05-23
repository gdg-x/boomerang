import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment } from '../../environments/environment'

import { GPlusService } from '../services/gplus.service';

@Component({
  selector: 'gdg-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  public coverPhoto: string;
  public description: string;
  private _pageSubscription: Subscription;
  public sponsors: any[] = (environment.sponsors) ? environment.sponsors : null;
  
  constructor(private _gPlus: GPlusService) { }

  ngOnInit() {
    this._pageSubscription = this._gPlus.page.subscribe((page: any) => {
      this.description = page.aboutMe;
      if (page.cover && page.cover.coverPhoto.url && !this.coverPhoto) {
        this.coverPhoto = page.cover.coverPhoto.url;
      }
    });
  }

  ngOnDestroy() {
    this._pageSubscription.unsubscribe();
  }
}
