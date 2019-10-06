import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Rating } from '../_models/rating';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // az összes értékelést visszaadja
  getRatings(page?, itemsPerPage?): Observable<PaginatedResult<Rating[]>> {
    const paginatedResult: PaginatedResult<Rating[]> = new PaginatedResult<Rating[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Rating[]>(`${this.baseUrl}ratings`, { observe: 'response', params })
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

  // egy konzulend értékeléseit adja vissza
  getRatingsOf(id: number, page?, itemsPerPage?): Observable<PaginatedResult<Rating[]>> {
    const paginatedResult: PaginatedResult<Rating[]> = new PaginatedResult<Rating[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Rating[]>(`${this.baseUrl}ratings/ratingOf/${id}`, { observe: 'response', params })
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

  getRating(id): Observable<Rating> {
    return this.http.get<Rating>(`${this.baseUrl}ratings/${id}`);
  }

}
