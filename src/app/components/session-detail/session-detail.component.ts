import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SessionsService} from "../../other-modules/services/sessions.service";
import {SpeakersService} from "../../other-modules/services/speakers.service";
import {MatDialog} from "@angular/material";
import {NotesComponent} from "./notes/notes.component";

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.css']
})
export class SessionDetailComponent implements OnInit {

  session;
  speakers = [];

  constructor(private activatedRoute : ActivatedRoute,
              private sessionService : SessionsService,
              private speakerService: SpeakersService,
              private router : Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.sessionService.getSessionById(params['id'])
        .then(data => {
          this.session = data;
          return data;
        })
        .then(session => {
          if (this.session && this.session.speakers) {
            this.session.speakers.map(speakerId => {
              this.speakerService.getSpeakerById(speakerId.toString()).then(speaker =>{
                console.log(speaker);
                if(speaker) this.speakers.push(speaker);
              })
            })
          }
        });
    });
  }

  goToDetailSpeaker(id) {
    this.router.navigate(['/speakers/'+id])
  }

  openNotes(){
    if(this.session.id) {
      let dialogRef = this.dialog.open(NotesComponent, {
        data: {
          sessionId: this.session.id
        },
      });
    }
  }
}
