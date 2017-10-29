import { Routes } from '@angular/router';
import {SessionsListComponent} from "../components/sessions-list/sessions-list.component";
import {SessionDetailComponent} from "../components/session-detail/session-detail.component";
import {SpeakersListComponent} from "../components/speakers-list/speakers-list.component";
import {SpeakerDetailComponent} from "../components/speaker-detail/speaker-detail.component";
import {HomeComponent} from "../components/home/home.component";

export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'sessions/:id', component: SessionDetailComponent},
  {path: 'speakers/:id', component: SpeakerDetailComponent}
];
