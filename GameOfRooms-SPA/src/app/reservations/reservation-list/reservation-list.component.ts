import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/_models/reservation';
import { Room } from 'src/app/_models/room';
import { ReservationService } from 'src/app/_services/reservation.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[];
  rooms: Room[];
  pagination: Pagination;

  selectedReservation: Reservation;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.reservations = data['reservations'].result;
      this.rooms = data['rooms'];
      this.pagination = data['reservations'].pagination;
    });
  }

  getRoom(id: number) {
    return this.rooms.find(r => r.id === id).capacity;
  }

  onSelectReservation(reservation: Reservation) {
    this.selectedReservation = reservation;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getReservations(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Reservation[]>) => {
        this.reservations = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  /*signUp(id) {
    if (!this.selectedReservation.capacity)
      this.selectedReservation.capacity = 0;

    this.selectedReservation.capacity++;
    console.log(this.selectedReservation.capacity);
  }*/

}
