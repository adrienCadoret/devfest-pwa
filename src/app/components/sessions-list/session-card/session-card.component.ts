import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.css']
})
export class SessionCardComponent implements OnInit {

  @Input() session;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  goToDetailRoad(id){
    this.router.navigate(['/sessions/'+id])
  }

}
