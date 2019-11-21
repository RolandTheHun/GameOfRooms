import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Rating } from 'src/app/_models/rating';
import { RatingService } from 'src/app/_services/rating.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  ratings: Rating[];
  students: User[];
  paginationRatings: Pagination;
  paginationUsers: Pagination;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService,
    private ratingService: RatingService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    if (this.user.userType === 1) {
      this.ratingService.getRatingsOf(this.user.id, 1, 3).subscribe(
        data => {
          this.ratings = data.result;
          this.paginationRatings = data.pagination;
        }, err => this.alertify.error(err)
      );
    }
    if (this.user.userType === 2) {
      this.userService.getUsers(1, 10).subscribe(
        data => {
          this.students = data.result;
          this.paginationUsers = data.pagination;
        }, err => this.alertify.error(err)
      );
    }
  }

  pageChangedRatings(event: any): void {
    this.paginationRatings.currentPage = event.page;
    this.loadRatings();
  }

  loadRatings() {
    this.ratingService.getRatingsOf(this.user.id, this.paginationRatings.currentPage, this.paginationRatings.itemsPerPage)
      .subscribe((res: PaginatedResult<Rating[]>) => {
        this.ratings = res.result;
        this.paginationRatings = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChangedUsers(event: any): void {
    this.paginationUsers.currentPage = event.page;
    this.loadStudents();
  }

  loadStudents() {
    this.userService.getUsers(this.paginationUsers.currentPage, this.paginationUsers.itemsPerPage)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.students = res.result;
        this.paginationUsers = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  adminUpdate(user: User) {
    this.user.userType = 1;
    this.userService.updateUser(user.id, user).subscribe(
      () => {
        this.alertify.success('User has been updated!');
      }, err => this.alertify.error(err),
      () => {
        this.loadStudents();
      }
    );
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        next => {
          this.alertify.success('Profile updated successfully!');
          this.editForm.reset(this.user);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
