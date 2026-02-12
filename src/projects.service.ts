import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project-entity'; 
import { ProjectLog } from './project-log.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(ProjectLog)
    private logRepository: Repository<ProjectLog>,
  ) {}

  // Fungsi untuk mengambil semua data proyek
  findAll() {
    return this.projectRepository.find();
  }

  // Fungsi untuk membuat proyek baru
  create(data: Partial<Project>) {
    const project = this.projectRepository.create(data);
    return this.projectRepository.save(project);
  }

  async updateProgress(id: number, percentage: number) {
    const project = await this.projectRepository.findOneBy({ id });
    
    if (project) {
      const log = this.logRepository.create({
        oldProgress: project.progressPercentage,
        newProgress: percentage,
        project: project,
      });
      await this.logRepository.save(log);

      await this.projectRepository.update(id, { progressPercentage: percentage });
    }
    
    return this.projectRepository.findOneBy({ id });
  }

  // Fungsi ini harus berada DI DALAM kurung kurawal class ProjectsService
  async getHistory(projectId: number) {
    return this.logRepository.find({
      where: { project: { id: projectId } },
      order: { changeDate: 'DESC' },
    });
  }
} // <--- Tutup kurung class ProjectsService