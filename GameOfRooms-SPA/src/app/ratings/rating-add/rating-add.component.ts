import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { RatingService } from 'src/app/_services/rating.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rating } from 'src/app/_models/rating';

@Component({
  selector: 'app-rating-add',
  templateUrl: './rating-add.component.html',
  styleUrls: ['./rating-add.component.css']
})
export class RatingAddComponent implements OnInit {
  @Output() setButton = new EventEmitter();
  @Input() userId;
  ratingForm: FormGroup;
  rating: Rating;

  constructor(
    private ratingService: RatingService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createRatingForm();
    console.log(this.ratingForm);
  }

  createRatingForm() {
    this.ratingForm = this.fb.group({
      star: ['', Validators.required],
      overall: ['', Validators.required],
    });
  }

  addRating() {
    if (this.ratingForm.valid) {
      this.rating = Object.assign({}, this.ratingForm.value);
      this.rating.userId = this.userId;
      this.ratingService.postRating(this.rating).subscribe(() => {
        this.alertify.success('You have successfully uploaded your overview on the consultant!');
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  onSubmit() {
    console.log(this.ratingForm);
    this.addRating();
    this.setButton.emit(false);
  }

}
