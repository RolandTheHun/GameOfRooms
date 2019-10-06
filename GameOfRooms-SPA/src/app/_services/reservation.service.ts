import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../_models/reservation';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getReservations(page?, itemsPerPage?): Observable<PaginatedResult<Reservation[]>> {
    const paginatedResult: PaginatedResult<Reservation[]> = new PaginatedResult<Reservation[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Reservation[]>(`${this.baseUrl}reservations`, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );

  }

  getReservation(id): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}reservations/${id}`);
  }

  updateReservation(id: number, cap: number) {
    return this.http.put(`${this.baseUrl}reservations/${id}`, { capacity: cap });
  }
}
