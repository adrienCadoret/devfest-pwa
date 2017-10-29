import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import * as localforage from "localforage";
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  allNotes;
  sessionId;
  currentNote;
  noteFormControl = new FormControl('', [
    Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.sessionId = data.sessionId;
  }

  ngOnInit() {
    let that = this;
    console.log('DATA IN NOTES',this.data);
    localforage.getItem('notes').then(function(value) {
      // This code runs once the value has been loaded
      // from the offline store.
      console.log('notes', value);
      if(!value) value = {};
      that.allNotes = value;
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
    });
  }

  addCurrentNote(){
    if(!this.allNotes[this.sessionId]) this.allNotes[this.sessionId] = [];
    this.allNotes[this.sessionId].push(this.currentNote);
    localforage.setItem('notes', this.allNotes);
  }

  deleteNote(string){
    let index = this.allNotes[this.sessionId].indexOf(string);
    if(index >= 0){
      console.log('Index to remove : ', index);
      this.allNotes[this.sessionId].splice(index, 1);
      localforage.setItem('notes', this.allNotes);
    }
  }

}
