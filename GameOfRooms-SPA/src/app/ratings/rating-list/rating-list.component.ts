import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rating } from 'src/app/_models/rating';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit {
  ratings: Rating[];
  consultants: User[];
  p: number = 1;

  selectedUserId: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.ratings = data['ratings'];
      this.consultants = data['consultants'];
      console.log(this.ratings);
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
