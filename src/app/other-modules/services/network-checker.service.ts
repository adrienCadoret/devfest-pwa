import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class NetworkCheckerService {

  // ARTICLES
  private availableConnection : Subject<boolean> = new BehaviorSubject<boolean>(null);
  public _sharedAvailableConnection = this.availableConnection.asObservable();

  constructor() {
    console.log('Listening the internet connection...')
    this.setAvailableConnection(navigator.onLine);
    this.listenToInternetConnection();
  }

  private listenToInternetConnection() {
    window.addEventListener('online', () => {
      console.log('online');
      this.setAvailableConnection(true);
    });
    window.addEventListener('offline', () => {
      console.log('offline');
      this.setAvailableConnection(false);
    });
  }

  setAvailableConnection(hasConnection){
    this.availableConnection.next(hasConnection);
  }

}
