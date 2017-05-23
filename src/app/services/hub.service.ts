import { Injectable } from '@angular/core';
import { Http, Jsonp, Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class HubService {
  private _gdg: Observable<any>;
  private _organizers: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private _http: Http, private _jsonp: Jsonp) {
    this._gdg = this._fetchGDG();
    this._gdg.subscribe((res: any) => {
      if (res && res.organizers) {
        res.organizers.map((organizer: string) => {
          this._fetchOrganizer(organizer).subscribe((res: any) => {
            if (res.image) {
              res.image.url = res.image.url.replace('?sz=50', '');
            }
            this._organizers.next([...this._organizers.value, res])
          });
        });
      }
    });
  }

  get gdg(): Observable<any> {
    return this._gdg;
  }

  get organizers(): BehaviorSubject<any[]> {
    return this._organizers;
  }

  private _fetchGDG(): Observable<any> {
    let query: string = environment.gdgxHub + '/api/v1/chapters/' + environment.googlePlus + '?callback=JSONP_CALLBACK';
    return this._jsonp.get(query).map((res: Response) => { return res.json(); }).catch(this._handleError);
  }

  private _fetchOrganizer(organizer: string): Observable<any> {
    let query: string = 'https://www.googleapis.com/plus/v1/people/'+organizer+'?key='+environment.googleAPI+'&fields=id%2CdisplayName%2Cimage%2CaboutMe%2Ctagline';
    return this._http.get(query).map((res: Response) => { return res.json(); }).catch(this._handleError);
  }

  private _handleError(error: Response | any): Observable<any> {
    return Observable.throw(error.code);
  }
}
