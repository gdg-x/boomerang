import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { HubService } from '../services/hub.service';

@Component({
  selector: 'gdg-organizers',
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.scss']
})
export class OrganizersComponent implements OnInit {
  public organizers: any[];
  private _organizersSubsction: Subscription;
  constructor(private _hub: HubService) { }

  ngOnInit() {
    this._hub.organizers.subscribe((organizers: any[]) => {
      this.organizers = organizers;
    });
  }
}
