import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gdg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public activeTab: number = 0;
  private _routes: string[] = ['About', 'News', 'Events', 'What We Do', 'Organizers', 'Photos', 'Code of Conduct'];
  private _routeSubscription: Subscription;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._routeSubscription = this._route.url.subscribe((segment: UrlSegment[]) => {
      if (segment.length !== 0) {
        const url: string = segment[0].path;
        let index = this._routes.findIndex((route: string) => {
          return (route.toLocaleLowerCase() === url.toLocaleLowerCase());
        });
        this._changeTab(index);
      }
    });
  }

  ngOnDestroy() {
    this._routeSubscription.unsubscribe();
  }

  private _changeTab(tab: number): void {
    if (tab >= 0) { this.activeTab = tab; }
  }
}
