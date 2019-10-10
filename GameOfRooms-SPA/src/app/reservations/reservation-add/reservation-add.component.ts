import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from 'src/app/_models/room';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/_models/reservation';
import { AuthService } from 'src/app/_services/auth.service';

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
  reservation: any;
  myReservation: Reservation;
  myDate: Date = new Date();

  rooms: Room[];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
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
      date: [null, Validators.required],
      summary: ['', Validators.required],
      ownMachine: [false, Validators.required],
      room: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      this.reservation.title = this.reservationForm.controls['title'].value;
      this.reservation.summary = this.reservationForm.controls['summary'].value;
      this.reservation.ownMachine = this.reservationForm.controls['ownMachine'].value;
      this.reservation.roomId = this.reservationForm.controls['room'].value;
      this.myDate.setHours(this.fromTime.getHours());
      this.myDate.setMinutes(this.fromTime.getMinutes());
      this.reservation.from = this.myDate;
      this.myDate.setHours(this.untilTime.getHours());
      this.myDate.setMinutes(this.untilTime.getMinutes());
      this.reservation.until = this.myDate;
      this.reservation.userId = this.authService.decodedToken.nameid;
      this.reservation.capacity = this.rooms.find(r => r.id === this.reservation.roomId);

      this.myReservation = Object.assign({}, this.reservation);
      console.log(this.myReservation);
    }
  }

}
