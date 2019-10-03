import { Component, OnInit } from '@angular/core';
import { Room } from '../_models/room';
import { RoomService } from '../_services/room.service';
import { AlertifyService } from '../_services/alertify.service';
import { ReservationService } from '../_services/reservation.service';
import { Reservation } from '../_models/reservation';
import { RatingService } from '../_services/rating.service';
import { Rating } from '../_models/rating';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
