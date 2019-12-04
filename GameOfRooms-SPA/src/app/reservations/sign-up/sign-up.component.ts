import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from 'src/app/_models/reservation';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ReservationService } from 'src/app/_services/reservation.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Input() reservation: Reservation;
  @Input() signedUp: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private reservationService: ReservationService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  checkUser(id: number) {
    // this.userService.getUserType(this.authService.decodedToken.nameid).subscribe(
    //   data => {
    //     if (data === 0) {
    //       this.signUp(id);
    //     } else {
    //       this.alertify.error('Consultants cant sign up for consultations!');
    //     }
    //   }, err => this.alertify.error(err)
    // );
    if (this.authService.decodedToken.role === 'student') {
      this.signUp(id);
    } else {
      this.alertify.error('Consultants cant sign up for consultations!');
    }
  }

  uncheckUser(id: number) {
    if (this.authService.decodedToken.role === 'student') {
      this.signDown(id);
    } else {
      this.alertify.error('You cant do this!');
    }
  }

  signDown(id: number) {
    this.userService.signDown(this.authService.decodedToken.nameid, id).subscribe(
      data => {
        this.alertify.success('You have signed down from the consultation!');
      }, error => this.alertify.error(error),
      () => {
        this.reservationService.updateReservation(id, this.reservation.capacity - 1).subscribe(
          data => {
            this.alertify.success('Reservation unregistered successfully!');
            this.router.navigate(['/reservations']);
          },
          error => {
            this.alertify.error(error);
          }, () => {
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/reservations']);
            });
          }
        );
      }
    );
  }

  signUp(id: number) {
    console.log(this.reservation);
    this.userService.signUp(this.authService.decodedToken.nameid, id).subscribe(
      data => {
        this.alertify.success('You have signed up for the consultation!');
      }, error => {
        this.alertify.error(error);
      },
      () => {
        this.reservationService.updateReservation(id, this.reservation.capacity + 1).subscribe(
          data => {
            this.alertify.success('Reservation registered successfully!');
            this.router.navigate(['/reservations']);
          },
          error => {
            this.alertify.error(error);
          }, () => {
            this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/reservations']);
            });
          }
        );
      }
    );
  }

}
