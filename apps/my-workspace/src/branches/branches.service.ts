import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchEntity } from './branches.entity';
import { Branch } from '@my-workspace/api-interfaces';


@Injectable()
export class BranchesService {
  constructor(@InjectRepository(BranchEntity) private readonly branchRepo: Repository<BranchEntity>) {}

  async createBranch(branchData: Partial<BranchEntity>): Promise<BranchEntity> {
    const newBranch = this.branchRepo.create(branchData);
    return this.branchRepo.save(newBranch);
  }

  async getBranches(): Promise<BranchEntity[]> {
    return this.branchRepo.find();
  }

  async getBranchByName(name: string): Promise<BranchEntity | undefined> {
    return this.branchRepo.findOne({ where: { name } });
  }

  async updateBranch(id: number, branchData: Partial<BranchEntity>): Promise<BranchEntity> {
    await this.branchRepo.update(id, branchData);
    return this.branchRepo.findOne({ where: { id } });
  }

  async deleteBranch(id: number): Promise<void> {
    await this.branchRepo.delete(id);
  }

  async getById(id: number): Promise<Branch | null> {
    return this.branchRepo.findOne({ where: { id } });
  }
  
}
