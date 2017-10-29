import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-speaker-card',
  templateUrl: './speaker-card.component.html',
  styleUrls: ['./speaker-card.component.css']
})
export class SpeakerCardComponent implements OnInit {

  @Input() speaker;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  goToDetailRoad(id){
    this.router.navigate(['/speakers/'+id])
  }

}
