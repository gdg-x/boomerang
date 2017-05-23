import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';

import { GPlusService } from './services/gplus.service';
import { HubService } from './services/hub.service';
import { MeetupService } from './services/meetup.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import { OrganizersComponent } from './organizers/organizers.component';
import { PhotosComponent } from './photos/photos.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AboutComponent,
    NewsComponent,
    EventsComponent,
    WhatWeDoComponent,
    OrganizersComponent,
    PhotosComponent,
    CodeOfConductComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    JsonpModule,
    MaterialModule,
    NgbCarouselModule.forRoot()
  ],
  providers: [
    GPlusService,
    HubService,
    MeetupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _gPlus: GPlusService, private _hub: HubService, private _meetup: MeetupService) { }
}
