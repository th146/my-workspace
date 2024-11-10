import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAppointmentsRouteComponent } from './create-appointment-route.component';

describe('CreateAppointmentsRouteComponent', () => {
  let component: CreateAppointmentsRouteComponent;
  let fixture: ComponentFixture<CreateAppointmentsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAppointmentsRouteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAppointmentsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
