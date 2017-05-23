import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { environment } from '../../environments/environment'

@Component({
  selector: 'gdg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public chapter: string = environment.chapter;
  public environment: any = environment;
  @ViewChild('sidenav') sidenav: MdSidenav;
  public tabs: string[] = ['About', 'News', 'Events', 'What We Do', 'Organizers', 'Photos', 'Code of Conduct'];

  constructor() { }

  ngOnInit() { }

  public goToURL(url: string): void {
    window.open(url, '_blank');
  }

  public toggleNav(): void {
    this.sidenav.toggle();
  }
}
