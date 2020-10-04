import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndividualHealthPage } from './individual-health.page';

describe('IndividualHealthPage', () => {
  let component: IndividualHealthPage;
  let fixture: ComponentFixture<IndividualHealthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualHealthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndividualHealthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
