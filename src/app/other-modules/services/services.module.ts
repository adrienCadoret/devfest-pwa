import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotesService} from "./notes.service";
import {SessionsService} from "./sessions.service";
import {SpeakersService} from "./speakers.service";
import {NetworkCheckerService} from "./network-checker.service";
import {SchedulesService} from "./schedules.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    NotesService,
    SessionsService,
    SpeakersService,
    NetworkCheckerService,
    SchedulesService
  ]
})
export class ServicesModule { }
