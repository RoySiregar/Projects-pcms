import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectLog } from './project-log.entity';


import { Project } from './project-entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectLog])], 
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}