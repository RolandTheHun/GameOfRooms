import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from 'src/app/_models/room';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/_models/reservation';
import { AuthService } from 'src/app/_services/auth.service';
import { Location } from '@angular/common';
import { ReservationService } from 'src/app/_services/reservation.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css']
})
export class ReservationAddComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  fromTime: Date = new Date();
  untilTime: Date = new Date();
  reservationForm: FormGroup;
  reservation: Reservation;
  myDate: Date = new Date();

  rooms: Room[];
  reservations: Reservation[];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private reservationService: ReservationService,
    private alertify: AlertifyService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.rooms = data['rooms'];
    });
    (this.bsConfig = {
      containerClass: 'theme-blue'
    }),
      this.createReservationForm();
  }

  createReservationForm() {
    this.reservationForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      ownMachine: [false, Validators.required],
      room: [null, Validators.required]
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      this.reservation = {
        userId: this.authService.decodedToken.nameid,
        title: this.reservationForm.controls['title'].value,
        summary: this.reservationForm.controls['summary'].value,
        roomId: this.reservationForm.controls['room'].value,
        ownMachine: this.reservationForm.controls['ownMachine'].value,
        from: null,
        until: null,
        capacity: this.rooms.find(r => r.id === +this.reservationForm.controls['room'].value).capacity,
        id: null
      };
      this.fromTime.setMonth(this.myDate.getMonth());
      this.fromTime.setDate(this.myDate.getDate());
      this.fromTime.setSeconds(0);
      this.reservation.from = this.fromTime;
      this.untilTime.setMonth(this.myDate.getMonth());
      this.untilTime.setDate(this.myDate.getDate());
      this.untilTime.setSeconds(0);
      this.reservation.until = this.untilTime;
      this.reservationService.getReservations().subscribe(
        s => {
          this.reservations = s.result.filter(r => r.roomId === +this.reservation.roomId
            && new Date(r.from).getDate() === this.reservation.from.getDate()
            && ((new Date(r.from).getTime() <= this.reservation.from.getTime()
              && new Date(r.until).getTime() >= this.reservation.from.getTime())
              || (new Date(r.from).getTime() <= this.reservation.until.getTime()
                && new Date(r.until).getTime() >= this.reservation.until.getTime())
              || (new Date(r.from).getTime() >= this.reservation.from.getTime()
                && new Date(r.until).getTime() <= this.reservation.until.getTime())));
        }, err => console.log('Error'), () => {
          if (this.reservations.length !== 0) {
            //TODO foglalás
            this.alertify.error('In this timestamp there is already a consultation in this room!');
          } else {
            this.alertify.success('Consultation reserving in progress...');
          }
        }
      );
    }
  }

}
