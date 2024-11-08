import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentDetailRouteComponent } from './appointment-detail-route.component';

describe('AppointmentDetailRouteComponent', () => {
  let component: AppointmentDetailRouteComponent;
  let fixture: ComponentFixture<AppointmentDetailRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentDetailRouteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentDetailRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
