import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment'

@Component({
  selector: 'gdg-code-of-conduct',
  templateUrl: './code-of-conduct.component.html',
  styleUrls: ['./code-of-conduct.component.scss']
})
export class CodeOfConductComponent implements OnInit {
  public chapter: string = 'GDG New Haven';

  constructor() { }

  ngOnInit() {
    this.chapter = environment.chapter;
  }
}
