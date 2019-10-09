/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RatingAddComponent } from './rating-add.component';

describe('RatingAddComponent', () => {
  let component: RatingAddComponent;
  let fixture: ComponentFixture<RatingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
