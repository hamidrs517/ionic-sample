import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/interfaces/place';

@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.page.html',
  styleUrls: ['./search-places.page.scss'],
})
export class SearchPlacesPage implements OnInit {

  type: string;

  searchResult: Place[] = [
    { id: 1, title: 'بانک ملی شعبه بازار', adderss: 'addersssadfasd sdf asf as ', tel: 'asdasd' },
    { id: 2, title: 'فروشگاه کوروش', adderss: 'addersssadfasd sdf asf as ', tel: 'asdasd' },
    { id: 3, title: 'دانشگاه تهران', adderss: 'addersssadfasd sdf asf as ', tel: 'asdasd' },
    { id: 4, title: 'فروشگاه رفاه', adderss: 'addersssadfasd sdf asf as ', tel: 'asdasd' }
  ];


  constructor() { }

  ngOnInit() {
    this.type = 'list';
  }

}
