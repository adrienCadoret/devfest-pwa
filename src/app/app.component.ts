import { Component } from '@angular/core';
import 'whatwg-fetch'
import {Location} from "@angular/common";
import {NetworkCheckerService} from "./other-modules/services/network-checker.service";
import {MatSnackBar} from "@angular/material";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  availableConnection;

  constructor(private location : Location,
              private networkService : NetworkCheckerService,
              public snackBar: MatSnackBar){
    let that = this;
    if ('serviceWorker' in navigator) {
      // enregistrement d'un service worker
      navigator.serviceWorker.register('sw.js')
        .then(function(registration) {
          console.log('Enregistrement Ok, le scope est :', registration.scope);
          that.networkService._sharedAvailableConnection.subscribe(hasConnection => {
            that.availableConnection = hasConnection;
            console.log(that.availableConnection);
            if(that.availableConnection){
              let snackBarRef = that.snackBar.open('Your internet connection has just been back', 'Refresh data !', {
                duration: 5000,
              })
              snackBarRef.onAction().subscribe(() => {
                that.refreshData();
              });
            }
          })
        })
        .catch(function(error) {
          console.log('Enregistrement Ko, erreur:', error);
        });

      // navigator.serviceWorker.onmessage = function(event) {
      //   console.log("Reçu du SW : ", event.data);
      // }
      // // envoyer un message au service worker
      // if (navigator.serviceWorker.controller) {
      //   navigator.serviceWorker.controller.postMessage({
      //     "command": "MISE_A_JOUR",
      //     "message": "Hello je suis un client"
      //   });
      // }
    }
  }

  // fetchData() {
  //   fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
  //     .then(function(response) {
  //       return response.json()
  //     }).then(function(json) {
  //     console.log('parsed json', json)
  //   }).catch(function(ex) {
  //     console.log('parsing failed', ex)
  //   })
  // }

  private refreshData() {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        "command": "FORCE_FETCH",
        "message": [
          'https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json',
          'https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json'
        ]});
    }
  }

  goBack(){
    this.location.back();
  }
}
