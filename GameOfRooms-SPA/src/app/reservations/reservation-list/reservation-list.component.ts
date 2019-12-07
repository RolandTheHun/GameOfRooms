import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/_models/reservation';
import { Room } from 'src/app/_models/room';
import { ReservationService } from 'src/app/_services/reservation.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[];
  rooms: Room[];
  pagination: Pagination;
  currentUser = this.authService.decodedToken.nameid;
  userType: number;

  modalRef: BsModalRef;
  bsConfig: Partial<BsDatepickerConfig>;
  fromTime: Date = new Date();
  untilTime: Date = new Date();
  reservationForm: FormGroup;

  selectedReservation: Reservation;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.reservations = data['reservations'].result;
      this.rooms = data['rooms'];
      this.pagination = data['reservations'].pagination;
    });
    this.createReservationForm();
    console.log(this.currentUser);
  }

  createReservationForm() {
    this.reservationForm = this.fb.group({
      title: ['', Validators.required],
      date: [null, Validators.required],
      from: [null, Validators.required],
      until: [null, Validators.required],
      capacity: ['', Validators.required]
    });
    this.userService.getUserType(this.currentUser).subscribe(
      data => this.userType = data,
      err => this.alertify.error(err)
    );
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

  areYouSure(): boolean {
    return confirm('Are you sure you want to delete?');
  }

  onDelete(id: number) {
    if (this.areYouSure()) {
      this.reservationService.deleteReservation(id).subscribe(
        () => {
          this.alertify.success('Successfully deleted reservation!');
        }, err => {
          this.alertify.error(err);
        }, () => {
          this.reservationService.getReservations(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
            data => this.reservations = data.result
          );
        });
    }
  }
}
