import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Room } from '../_models/room';
import { RoomService } from '../_services/room.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RoomListResolver implements Resolve<Room[]>
{
    constructor(
        private roomService: RoomService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Room[]> {
        return this.roomService.getRooms().pipe(
            catchError(error => {
                this.alertify.error('Cannot retrieve rooms! ' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}