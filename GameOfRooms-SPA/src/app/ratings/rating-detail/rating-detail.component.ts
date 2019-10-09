import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Rating } from 'src/app/_models/rating';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from 'src/app/_services/rating.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-rating-detail',
  templateUrl: './rating-detail.component.html',
  styleUrls: ['./rating-detail.component.css']
})
export class RatingDetailComponent implements OnChanges {
  @Input() id: number;
  @Input() name: string;

  ratings: Rating[];
  pagination: Pagination;

  buttonBool: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ratingServcie: RatingService,
    private alertify: AlertifyService
  ) { }

  ngOnChanges() {
    this.ratingServcie.getRatingsOf(this.id, 1, 2).subscribe(
      data => {
        this.ratings = data.result;
        this.pagination = data.pagination;
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadRatings();
  }

  loadRatings() {
    this.ratingServcie.getRatingsOf(this.id, this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Rating[]>) => {
        this.ratings = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  openAdd() {
    this.buttonBool = true;
  }

  onEmit(emitValue: boolean) {
    this.buttonBool = emitValue;
  }

  // overallStars() {
  //   const l = this.ratings.length;
  //   const stars = this.ratings.map(r => r.star).reduce(function (acc, star) {
  //     return (acc + star) / l;
  //   });
  //   return stars.toFixed(2);
  // }

}
