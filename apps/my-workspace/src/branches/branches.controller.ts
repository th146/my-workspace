import { OpeningHoursPerBranch } from '@my-workspace/api-interfaces';
import { Controller } from '@nestjs/common';


export const openingHoursPerBranch: OpeningHoursPerBranch = {
    Berlin: {
      openingHoursStart: '08:00',
      openingHoursEnd: '16:00',
    },
    Dortmund: {
      openingHoursStart: '07:00',
      openingHoursEnd: '20:00',
    },
  }
  
@Controller('branches')
export class BranchesController {}
