import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { AppointmentsService } from "../appointments.service";
import { first, map } from "rxjs";
import { isTimeInInterval } from "@my-workspace/shared";

@Injectable({
  providedIn: 'root',
})
export class OpeningHoursValidatorService {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  openingHoursValidator(timeControlName: string, branchNameControlName: string): AsyncValidatorFn {
    return (group: AbstractControl) => {
      const time = group.get(timeControlName)?.value;
      const branchName = group.get(branchNameControlName)?.value;
      
      return this.appointmentsService.getBranches().pipe(
        first(),
        map((branches) => branches.find(branch => branch.name === branchName)),
        map((branch) => {
          if (!branch || !time) {
            return { openingHours: 'Could not find branch or time' };
          }

          const { openingHoursStart, openingHoursEnd } = branch;

          return isTimeInInterval(time, openingHoursStart, openingHoursEnd)
            ? null
            : {
                openingHours: `Time ${time} is not in interval [${openingHoursStart}, ${openingHoursEnd}]`,
              };
        })
      );
    };
  }
}
