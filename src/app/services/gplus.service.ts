import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class GPlusService {
  private _news: Observable<any>;
  private _page: Observable<any>;

  constructor(private _http: Http) {
    this._news = this._fetchNews();
    this._page = this._fetchPage();
  }

  get news(): Observable<any> {
    return this._news;
  }

  get page(): Observable<any> {
    return this._page;
  }

  private _extractData(res: Response): any {
    let body = res.json();
    if (body.error) { throw body.error };
    return body || [];
  }

  private _fetchNews(): Observable<any[]> {
    let query: string = 'https://www.googleapis.com/plus/v1/people/' + environment.googlePlus + '/activities/public?maxResults=12&key=' + environment.googleAPI;
    return this._http.get(query).map((res: Response) => { return res.json().items; }).catch(this._handleError);
  }

  private _fetchPage(): Observable<any[]> {
    let query: string = 'https://www.googleapis.com/plus/v1/people/' + environment.googlePlus + '?fields=aboutMe%2Ccover%2Cimage%2CplusOneCount&key=' + environment.googleAPI;
    return this._http.get(query).map(this._extractData).catch(this._handleError);
  }

  private _handleError(error: Response | any): Observable<any> {
    return Observable.throw(error.code);
  }
}
