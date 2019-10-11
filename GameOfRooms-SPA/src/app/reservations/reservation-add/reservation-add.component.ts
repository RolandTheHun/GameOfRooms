import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from 'src/app/_models/room';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/_models/reservation';
import { AuthService } from 'src/app/_services/auth.service';
import { Location } from '@angular/common';

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
  myDate2: Date = new Date();

  rooms: Room[];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
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
      this.myDate2 = this.myDate;
      this.myDate.setHours(this.fromTime.getHours());
      this.myDate.setMinutes(this.fromTime.getMinutes());
      this.myDate2.setHours(this.untilTime.getHours());
      this.myDate2.setMinutes(this.untilTime.getMinutes());
      this.reservation = {
        userId: this.authService.decodedToken.nameid,
        title: this.reservationForm.controls['title'].value,
        summary: this.reservationForm.controls['summary'].value,
        roomId: this.reservationForm.controls['room'].value,
        ownMachine: this.reservationForm.controls['ownMachine'].value,
        from: this.myDate,
        until: this.myDate2,
        capacity: this.rooms.find(r => r.id === +this.reservationForm.controls['room'].value).capacity,
        id: null
      };
      console.log(this.reservation);
    }
  }

}
