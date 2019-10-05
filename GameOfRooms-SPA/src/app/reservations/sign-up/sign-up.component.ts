import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from 'src/app/_models/reservation';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ReservationService } from 'src/app/_services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Input() reservation: Reservation;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private reservationService: ReservationService,
  ) { }

  ngOnInit() {
  }

  signUp(id: number) {
    console.log(this.reservation);
    this.userService.signUp(this.authService.decodedToken.nameid, id).subscribe(
      data => {
        this.alertify.success('You have signed up for the consultation!');
        this.router.navigate(['/lists']);
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
          }
        );
      }
    );
  }

}
