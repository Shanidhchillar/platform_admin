import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'https://905f-171-49-186-141.ngrok-free.app/api/v1/booking/listCustomers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching customers:', error);
          // Handle the error as needed (e.g., show an error message)
          throw error;
        })
      );
  }
}

  // Add more methods as needed for other API interactions

