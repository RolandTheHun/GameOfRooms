import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit {
  consultants: User[];
  pagination: Pagination;

  selectedUserId: number;
  selectedUserName: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.consultants = data['consultants'].result;
      this.pagination = data['consultants'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadConsultants();
  }

  loadConsultants() {
    this.userService.getConsultants(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.consultants = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  onSelectConsultant(id: string, name: string) {
    this.selectedUserId = +id;
    this.selectedUserName = `${this.consultants.find(c => c.id === +id).familyName} 
    ${this.consultants.find(c => c.id === +id).firstName}`;
  }

  // getName(id) {
  //   return this.consultants.filter(r => r.id === id).map(c => c.familyName + ' ' + c.firstName);
  // }

  // getRatings(id) {
  //   return this.ratings.filter(r => r.userId === id);
  // }

  // overallStars(id) {
  //   const l = this.ratings.filter(r => r.userId === id).length;
  //   const stars = this.ratings.filter(r => r.userId === id).map(r => r.star).reduce(function (acc, star) {
  //     return (acc + star) / l;
  //   });
  //   return stars.toFixed(2);
  // }

}
