import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateDoctorsDataService {
  private storageKey = 'createDoctorsDataService';

  get createDoctorsData(): any {
    const storedValue = localStorage.getItem(this.storageKey);
    return storedValue !== null ? JSON.parse(storedValue) : {}; // Provide a default value
  }

  set createDoctorsData(value: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(value));
  }

  clearCreateDoctorsData() {
    localStorage.removeItem(this.storageKey);
  }

  constructor() { }
}
