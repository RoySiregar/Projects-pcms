import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Project } from './project-entity';

@Entity()
export class ProjectLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  oldProgress: number;

  @Column()
  newProgress: number;

  @CreateDateColumn()
  changeDate: Date;

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;
}