import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetcherService {
  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  // Generic GET request
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.apiUrl + endpoint);
  }

  // Generic POST request
  post<T>(endpoint: string, body: T): Observable<T> {
    return this.http.post<T>(this.apiUrl + endpoint, body);
  }

  // Generic PUT request
  put<T>(endpoint: string, body: T): Observable<T> {
    return this.http.put<T>(this.apiUrl + endpoint, body);
  }

  // Generic PATCH request
  patch<T>(endpoint: string, body: Partial<T>): Observable<T> {
    return this.http.patch<T>(this.apiUrl + endpoint, body);
  }

  // Generic DELETE request
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(this.apiUrl + endpoint);
  }
}
