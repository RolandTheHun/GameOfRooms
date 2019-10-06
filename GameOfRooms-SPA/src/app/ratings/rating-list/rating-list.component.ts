import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rating } from 'src/app/_models/rating';
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
  ratings: Rating[];
  consultants: User[];
  paginationConsultants: Pagination;
  paginationRatings: Pagination;

  selectedUserId: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.ratings = data['ratings'].result;
      this.paginationRatings = data['ratings'].pagination;
      this.consultants = data['consultants'].result;
      this.paginationConsultants = data['consultants'].pagination;
      console.log(this.ratings);
    });
  }

  pageChanged(event: any): void {
    this.paginationConsultants.currentPage = event.page;
    this.loadConsultants();
  }

  loadConsultants() {
    this.userService.getUsers(this.paginationConsultants.currentPage, this.paginationConsultants.itemsPerPage)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.consultants = res.result;
        this.paginationConsultants = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  onSelectConsultant(id: string) {
    this.selectedUserId = +id;
  }

  getName(id) {
    return this.consultants.filter(r => r.id === id).map(c => c.familyName + ' ' + c.firstName);
  }

  getRatings(id) {
    return this.ratings.filter(r => r.userId === id);
  }

  overallStars(id) {
    const l = this.ratings.filter(r => r.userId === id).length;
    const stars = this.ratings.filter(r => r.userId === id).map(r => r.star).reduce(function (acc, star) {
      return (acc + star) / l;
    });
    return stars.toFixed(2);
  }

}
