import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnDestroy {

  @Output() rate: EventEmitter<number> = new EventEmitter<number>()
  constructor() { }
  ngOnDestroy(): void {
    this.rate.next()
    this.rate.complete()
  }

  change(item: HTMLInputElement) {
    console.warn(item.value)
    // this.rate.emit(Number(item.value))
  }
  ngOnInit(): void {
  }

}
