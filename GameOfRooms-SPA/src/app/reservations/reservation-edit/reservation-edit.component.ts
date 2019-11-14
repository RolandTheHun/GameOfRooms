import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reservation } from 'src/app/_models/reservation';
import { Room } from 'src/app/_models/room';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ReservationService } from 'src/app/_services/reservation.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  editingReservation = this.route.snapshot.paramMap.get('id');

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
    private location: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.rooms = data['rooms'];
    });
    (this.bsConfig = {
      containerClass: 'theme-blue'
    })//,
    //this.createReservationForm();
    this.reservationService.getReservation(this.editingReservation).subscribe(data =>
      this.reservation = data, err => this.alertify.error(err),
      () => this.createReservationForm());
  }

  createReservationForm() {
    this.reservationForm = this.fb.group({
      title: [this.reservation.title, Validators.required],
      summary: [this.reservation.summary, Validators.required],
      ownMachine: [this.reservation.ownMachine, Validators.required],
      roomId: [this.reservation.roomId, Validators.required]
    });
    this.fromTime = this.reservation.from;
    this.untilTime = this.reservation.until;
  }

  goBack() {
    this.location.navigate(['/reservations']);
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      // this.reservation = {
      //   userId: this.authService.decodedToken.nameid,
      //   title: this.reservationForm.controls['title'].value,
      //   summary: this.reservationForm.controls['summary'].value,
      //   roomId: this.reservationForm.controls['room'].value,
      //   ownMachine: this.reservationForm.controls['ownMachine'].value,
      //   from: null,
      //   until: null,
      //   capacity: this.rooms.find(r => r.id === +this.reservationForm.controls['room'].value).capacity,
      //   id: null
      // };
      this.reservation = Object.assign({}, this.reservationForm.value);
      this.reservation.userId = +this.authService.decodedToken.nameid;
      this.reservation.capacity = 0;
      this.reservation.roomId = +this.reservationForm.controls['roomId'].value;
      this.fromTime.setMonth(this.myDate.getMonth());
      this.fromTime.setDate(this.myDate.getDate());
      this.fromTime.setSeconds(0);
      this.reservation.from = this.fromTime;
      this.untilTime.setMonth(this.myDate.getMonth());
      this.untilTime.setDate(this.myDate.getDate());
      this.untilTime.setSeconds(0);
      this.reservation.until = this.untilTime;
      this.reservationService.getReservations(1, 1000).subscribe(
        s => {
          this.reservations = s.result.filter(r => r.id !== +this.route.snapshot.paramMap.get('id') && r.roomId === +this.reservation.roomId
            && new Date(r.from).getDate() === this.reservation.from.getDate()
            && ((new Date(r.from).getTime() <= this.reservation.from.getTime()
              && new Date(r.until).getTime() >= this.reservation.from.getTime())
              || (new Date(r.from).getTime() <= this.reservation.until.getTime()
                && new Date(r.until).getTime() >= this.reservation.until.getTime())
              || (new Date(r.from).getTime() >= this.reservation.from.getTime()
                && new Date(r.until).getTime() <= this.reservation.until.getTime())));
        }, err => console.log('Error ' + err), () => {
          if (this.reservations.length !== 0) {
            this.alertify.error('In this timestamp there is already a consultation in this room!');
          } else {
            console.log(this.reservation);
            //this.reservationService.postReservation(this.reservation).subscribe();
            this.reservationService.updateReservationFully(+this.editingReservation, this.reservation).subscribe();
            this.alertify.success('Consultation update in progress...');
            this.goBack();
          }
        }
      );
    }
  }

}
