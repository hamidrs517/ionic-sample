import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchPlacesPage } from './search-places.page';

describe('SearchPlacesPage', () => {
  let component: SearchPlacesPage;
  let fixture: ComponentFixture<SearchPlacesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPlacesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
