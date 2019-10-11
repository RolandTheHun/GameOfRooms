import { Injectable } from "@angular/core";
import { UserService } from '../_services/user.service';
import { Router, CanActivate } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReservationAddGuard implements CanActivate {
    userType: number;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private alertify: AlertifyService
    ) { }

    canActivate(): Observable<boolean> {
        return this.userService.getUserType(this.authService.decodedToken.nameid).pipe(
            map((data) => {
                if (data === 1) {
                    return true;
                }
                this.alertify.error('You shall not pass!');
                return false;
            }
            )
        );
        // if (this.userType === 1) {
        //     return true;
        // }
        // this.alertify.error('You shall not pass!!!');
        // this.router.navigate(['/home']);
        // return false;
    }
}