import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchEntity } from './branches.entity';


@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Get()
  getAllBranches(): Promise<BranchEntity[]> {
    return this.branchesService.getBranches();
  }

  @Post()
  createBranch(@Body() branchData: Partial<BranchEntity>): Promise<BranchEntity> {
    return this.branchesService.createBranch(branchData);
  }

  @Patch(':id')
  updateBranch(@Param('id', ParseIntPipe) id: number, @Body() branchData: Partial<BranchEntity>): Promise<BranchEntity> {
    return this.branchesService.updateBranch(id, branchData);
  }

  @Delete(':id')
  deleteBranch(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.branchesService.deleteBranch(id);
  }
}
