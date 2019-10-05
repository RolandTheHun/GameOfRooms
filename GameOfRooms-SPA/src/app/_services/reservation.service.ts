import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../_models/reservation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}reservations`);
  }

  getReservation(id): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}reservations/${id}`);
  }

  updateReservation(id: number, cap: number) {
    return this.http.put(`${this.baseUrl}reservations/${id}`, { capacity: cap });
  }
}
