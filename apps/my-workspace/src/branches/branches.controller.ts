import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
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

  @Get(':id')
  async getBranchById(@Param('id', ParseIntPipe) id: number) {
    const canidate = await this.branchesService.getById(id);

    if (canidate === undefined) {
      throw new HttpException('', HttpStatus.NOT_FOUND)
    }
    return canidate
}

}
