import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Rating } from '../_models/rating';
import { RatingService } from '../_services/rating.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RatingListResolver implements Resolve<Rating[]>{
    pageNumber = 1;
    pageSize = 2;

    constructor(
        private ratingService: RatingService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Rating[]> {
        return this.ratingService.getRatings(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Cannot retrieve ratings! ' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}