import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { map, find, catchError } from 'rxjs/operators';

@Injectable()
export class ConsultantListResolver implements Resolve<User[]>
{
    constructor(
        private userService: UserService,
        private router: Router,
        private alertify: AlertifyService
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers().pipe(
            map(users => users.filter(u => u.userType === 1)),
            catchError(error => {
                this.alertify.error('Cannot retrieve consultants!' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}