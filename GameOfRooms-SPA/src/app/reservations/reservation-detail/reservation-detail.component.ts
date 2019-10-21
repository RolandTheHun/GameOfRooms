import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Reservation } from 'src/app/_models/reservation';
import { RoomService } from 'src/app/_services/room.service';
import { Room } from 'src/app/_models/room';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit, OnChanges {
  @Input() reservation: Reservation;
  room: Room;

  constructor(
    private roomService: RoomService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.roomService.getRoom(this.reservation.roomId).subscribe(
      room => this.room = room,
      error => this.alertify.error(error)
    );
  }

  ngOnChanges() {
    this.roomService.getRoom(this.reservation.roomId).subscribe(
      room => this.room = room,
      error => this.alertify.error(error)
    );
  }

}
