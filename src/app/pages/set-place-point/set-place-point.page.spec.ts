import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetPlacePointPage } from './set-place-point.page';

describe('SetPlacePointPage', () => {
  let component: SetPlacePointPage;
  let fixture: ComponentFixture<SetPlacePointPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPlacePointPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetPlacePointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
