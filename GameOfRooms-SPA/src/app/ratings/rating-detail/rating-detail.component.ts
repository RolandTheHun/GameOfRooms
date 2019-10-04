import { Component, OnInit, Input } from '@angular/core';
import { Rating } from 'src/app/_models/rating';

@Component({
  selector: 'app-rating-detail',
  templateUrl: './rating-detail.component.html',
  styleUrls: ['./rating-detail.component.css']
})
export class RatingDetailComponent implements OnInit {
  @Input() ratings: Rating[];
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
