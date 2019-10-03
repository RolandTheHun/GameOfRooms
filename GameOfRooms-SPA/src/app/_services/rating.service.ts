import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Rating } from '../_models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.baseUrl}ratings`);
  }

  getRating(id): Observable<Rating> {
    return this.http.get<Rating>(`${this.baseUrl}ratings/${id}`);
  }

}
