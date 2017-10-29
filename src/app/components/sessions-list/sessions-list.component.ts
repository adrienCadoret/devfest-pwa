import { Component, OnInit } from '@angular/core';
import {SessionsService} from "../../other-modules/services/sessions.service";
import {SchedulesService} from "../../other-modules/services/schedules.service";

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss']
})
export class SessionsListComponent implements OnInit {

  sessions = [];
  schedules = [];
  constructor(private sessionsService : SessionsService,
              private scheduleService : SchedulesService) { }

  ngOnInit() {
    console.log('ON INIT SESSIONS')
    this.sessionsService.getAllSessions().then(data => {
      this.sessions = data;
      this.scheduleService.getSchedule().then(schedules => {
        this.schedules = schedules;
      })
    });
  }

  getSession(sessionId){
    return this.sessions.filter(session => session.id.toString() === sessionId.toString())[0];
  }

}
