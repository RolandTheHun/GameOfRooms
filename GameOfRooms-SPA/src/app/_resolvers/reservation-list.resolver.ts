import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Reservation } from '../_models/reservation';
import { ReservationService } from '../_services/reservation.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ReservationListResolver implements Resolve<Reservation[]>{
    pageNumber = 1;
    pageSize = 5;

    constructor(
        private reservationService: ReservationService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Reservation[]> {
        return this.reservationService.getReservations(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving reservations!');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}