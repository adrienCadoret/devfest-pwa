import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SpeakersService} from "../../other-modules/services/speakers.service";
import {SessionsService} from "../../other-modules/services/sessions.service";

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.css']
})
export class SpeakerDetailComponent implements OnInit {

  speaker;
  sessions;

  constructor(private activatedRoute : ActivatedRoute,
              private speakerService : SpeakersService,
              private sessionService : SessionsService,
              private router : Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.speakerService.getSpeakerById(params['id'].toString())
        .then(data => {
          this.speaker = data;
          return data;
        })
        .then(speaker => {
          this.sessionService.getSessionsBySpeaker(speaker.id).then(sessions => {
            this.sessions = sessions;
            console.log(sessions);
          })
        })
    });
  }

  goToDetailSession(sessionId) {
    this.router.navigate(['/sessions/'+sessionId])
  }
}
