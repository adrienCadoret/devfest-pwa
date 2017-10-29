import { Component, OnInit } from '@angular/core';
import {SpeakersService} from "../../other-modules/services/speakers.service";

@Component({
  selector: 'app-speakers-list',
  templateUrl: './speakers-list.component.html',
  styleUrls: ['./speakers-list.component.css']
})
export class SpeakersListComponent implements OnInit {

  speakers = [];

  constructor(private speakersService : SpeakersService) { }

  ngOnInit() {
    this.speakersService.getAllSpeakers().then(data => this.speakers = data);
  }

}
