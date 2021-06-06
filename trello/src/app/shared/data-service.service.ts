import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }

  clearSession(): void {
    window.sessionStorage.clear();
  }
  storeTrelloList(data: any) {
    window.localStorage.setItem('list', JSON.stringify(data));
  }
  getTrelloList() {
    return JSON.parse(window.localStorage.getItem('list'));
  }
  clearStorage() {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }
}
