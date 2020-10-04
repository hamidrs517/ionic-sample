import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-plus',
  templateUrl: './rating-plus.component.html',
  styleUrls: ['./rating-plus.component.scss']
})
export class RatingPlusComponent implements OnInit {
  @Input() randId
  constructor() { }

  ngOnInit(): void {
  }

}
