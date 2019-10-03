import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/_models/reservation';
import { Room } from 'src/app/_models/room';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[];
  rooms: Room[];

  selectedReservation: Reservation;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.reservations = data['reservations'];
      this.rooms = data['rooms'];
    });
  }

  getRoom(id: number) {
    return this.rooms.find(r => r.id === id).capacity;
  }

  onSelectReservation(reservation: Reservation) {
    this.selectedReservation = reservation;
  }

  /*signUp(id) {
    if (!this.selectedReservation.capacity)
      this.selectedReservation.capacity = 0;

    this.selectedReservation.capacity++;
    console.log(this.selectedReservation.capacity);
  }*/

}
