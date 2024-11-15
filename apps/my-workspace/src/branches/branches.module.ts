import { CommonModule } from '@angular/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';
import { BranchEntity } from './branches.entity';


@Module({
  imports: [TypeOrmModule.forFeature([BranchEntity])], 
  controllers: [BranchesController],
  providers: [BranchesService],
})
export class BranchesModule {}
