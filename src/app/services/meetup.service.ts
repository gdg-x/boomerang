import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class MeetupService {
  private _past: Observable<any[]>;
  private _photos: Observable<any[]>;
  private _upcoming: Observable<any[]>;

  constructor(private _jsonp: Jsonp) {
    this._past = this._fetchPast();
    this._photos = this._fetchPhotos();
    this._upcoming = this._fetchUpcoming();
  }

  get past(): Observable<any[]> {
    return this._past;
  }

  get photos(): Observable<any[]> {
    return this._photos;
  }

  get upcoming(): Observable<any[]> {
    return this._upcoming;
  }

  private _extractData(res: Response): any {
    let body = res.json();
    if (body.data.errors) { throw body.data.errors };
    return body.data || [];
  }

  private _fetchPast(): Observable<any[]> {
    let query: string = 'https://api.meetup.com/' + environment.meetup + '/events?status=past&page=4&desc=true&callback=JSONP_CALLBACK';
    return this._jsonp.get(query).map(this._extractData).catch(this._handleError);
  }

  private _fetchPhotos(): Observable<any[]> {
    let query: string = 'https://api.meetup.com/' + environment.meetup + '/photos?&sign=true&photo-host=secure&page=20&desc=true&callback=JSONP_CALLBACK';
    return this._jsonp.get(query).map(this._extractData).catch(this._handleError);
  }

  private _fetchUpcoming(): Observable<any[]> {
    let query: string = 'https://api.meetup.com/' + environment.meetup + '/events?status=upcoming&page=8&callback=JSONP_CALLBACK';
    return this._jsonp.get(query).map(this._extractData).catch(this._handleError);
  }

  private _handleError(error: Response | any): Observable<any> {
    return Observable.throw(error.code);
  }
}
