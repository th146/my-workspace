import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAppointmentRouteComponent } from './create-appointment-route.component';

describe('CreateAppointmentRouteComponent', () => {
  let component: CreateAppointmentRouteComponent;
  let fixture: ComponentFixture<CreateAppointmentRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAppointmentRouteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAppointmentRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
