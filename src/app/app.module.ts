import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SessionsListComponent } from './components/sessions-list/sessions-list.component';
import { SpeakersListComponent } from './components/speakers-list/speakers-list.component';
import { SessionCardComponent } from './components/sessions-list/session-card/session-card.component';
import { SpeakerCardComponent } from './components/speakers-list/speaker-card/speaker-card.component';
import { SessionDetailComponent } from './components/session-detail/session-detail.component';
import { SpeakerDetailComponent } from './components/speaker-detail/speaker-detail.component';
import {ROUTES} from "./router/routes";
import {RouterModule, PreloadAllModules} from "@angular/router";
import {DesignModule} from "./other-modules/material-design/material-design.module";
import {ServicesModule} from "./other-modules/services/services.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { NotesComponent } from './components/session-detail/notes/notes.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionsListComponent,
    SpeakersListComponent,
    SessionCardComponent,
    SpeakerCardComponent,
    SessionDetailComponent,
    SpeakerDetailComponent,
    NotesComponent,
    HomeComponent
  ],
  entryComponents: [
    NotesComponent
  ],
  imports: [
    BrowserModule,
    DesignModule,
    FlexLayoutModule,
    ServicesModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
